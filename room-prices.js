(function () {
    const data = window.roomPriceData;
    const section = document.querySelector("#habitaciones");
    if (!section) return;
    if (!data || !Array.isArray(data.rooms)) {
        throw new Error("No se pudo cargar la configuración de precios de habitaciones.");
    }

    const language = document.documentElement.lang.toLowerCase();
    const formatter = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });
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
                cell.innerHTML = hasDiscount
                    ? `<span class="precio-original">${formatPrice(plan.baseCop[guestIndex])}</span><span class="precio-descuento">${formatPrice(plan.discountCop[guestIndex])}</span>`
                    : `<span class="precio-descuento">${formatPrice(plan.baseCop[guestIndex])}</span>`;
            });
        });
    });
})();
