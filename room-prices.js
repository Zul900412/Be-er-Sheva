(function () {
    const data = window.roomPriceData;
    const section = document.querySelector("#habitaciones");
    if (!section) return;
    if (!data || !Array.isArray(data.rooms)) {
        throw new Error("No se pudo cargar la configuración de precios de habitaciones.");
    }

    const language = document.documentElement.lang.toLowerCase();
    const formatter = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });
    const bookingSettings = data.platformSettings.booking;
    const bookingDiscountPercent = bookingSettings.geniusDiscountPercent
        + bookingSettings.additionalDiscounts.reduce((sum, discount) => sum + discount.percent, 0);
    const bookingPromoFactor = 1 - bookingDiscountPercent / 100;
    const bookingCommissionFactor = 1 - bookingSettings.commissionPercent / 100;
    if (bookingPromoFactor <= 0 || bookingCommissionFactor <= 0 || data.platformSettings.targetNetPercent <= 0) {
        throw new Error("La configuración de Booking no permite calcular un precio base válido.");
    }

    const calculateBookingBasePrice = promoPrice => {
        const bookingTargetNet = promoPrice * data.platformSettings.targetNetPercent / 100;
        return Math.ceil(bookingTargetNet / (bookingPromoFactor * bookingCommissionFactor) / 1000) * 1000;
    };

    const formatPrice = value => {
        if (language.startsWith("es")) return `$${formatter.format(value)}`;
        if (language.startsWith("fr")) {
            return `${Math.ceil(value / data.rates.copPerEur * (1 + data.rates.eurBufferPercent / 100))}€`;
        }
        return `$${Math.ceil(value / data.rates.copPerUsd)}`;
    };

    const cards = section.querySelectorAll(".habitacion-card");
    if (cards.length !== data.rooms.length) {
        throw new Error("La cantidad de habitaciones no coincide con la configuración de precios.");
    }

    cards.forEach((card, roomIndex) => {
        const room = data.rooms[roomIndex];
        const rows = card.querySelectorAll(".tarifas-box .tarifa-item-grid");
        if (rows.length !== room.plans.length) {
            throw new Error(`Las modalidades de ${room.name} no coinciden con la configuración de precios.`);
        }

        rows.forEach((row, planIndex) => {
            const cells = row.querySelectorAll(".precio-col");
            const plan = room.plans[planIndex];
            if (cells.length !== plan.baseCop.length || cells.length !== plan.discountCop.length) {
                throw new Error(`La cantidad de precios de ${room.name} no coincide con la configuración.`);
            }

            cells.forEach((cell, guestIndex) => {
                const hasDiscount = plan.discountEnabled?.[guestIndex] !== false;
                const bookingBasePrice = Array.isArray(plan.bookingBaseCop)
                    && Number.isFinite(plan.bookingBaseCop[guestIndex])
                    ? plan.bookingBaseCop[guestIndex]
                    : calculateBookingBasePrice(plan.discountCop[guestIndex]);
                const basePrice = Math.ceil(bookingBasePrice * data.platformSettings.targetNetPercent / 100 / 1000) * 1000;
                cell.innerHTML = hasDiscount
                    ? `<span class="precio-original">${formatPrice(basePrice)}</span><span class="precio-descuento">${formatPrice(plan.discountCop[guestIndex])}</span>`
                    : `<span class="precio-descuento">${formatPrice(basePrice)}</span>`;
            });
        });
    });
})();
