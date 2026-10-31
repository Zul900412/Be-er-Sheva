window.roomPriceData = {
    version: 1,
    rates: {
        copPerUsd: 3164.56,
        copPerEur: 3533.57,
        eurBufferPercent: 5,
        updatedAt: "2026-10-31"
    },
    baseIncreasePercent: 30,
    platformSettings: {
        commissionVatPercent: 19,
        targetNetPercent: 90,
        booking: { commissionPercent: 0, geniusDiscountPercent: 0, additionalDiscounts: [], guestVatPercent: 19 },
        airbnb: { commissionPercent: 0, discountPercent: 0 }
    },
    rooms: [
        {
            id: "junior-suite",
            name: "Junior Suite (201)",
            plans: [
                { baseCop: [143000, 195000], discountCop: [110000, 150000], discountEnabled: [true, true] },
                { baseCop: [156000, 221000], discountCop: [120000, 170000], discountEnabled: [true, true] },
                { baseCop: [159000, 227000], discountCop: [122000, 174000], discountEnabled: [true, true] },
                { baseCop: [169000, 247000], discountCop: [130000, 190000], discountEnabled: [true, true] }
            ]
        },
        {
            id: "double-executive",
            name: "Double Deluxe (203)",
            plans: [
                { baseCop: [117000, 182000], discountCop: [90000, 140000], discountEnabled: [true, true] },
                { baseCop: [130000, 208000], discountCop: [100000, 160000], discountEnabled: [true, true] },
                { baseCop: [133000, 214000], discountCop: [102000, 164000], discountEnabled: [true, true] },
                { baseCop: [143000, 234000], discountCop: [110000, 180000], discountEnabled: [true, true] }
            ]
        },
        {
            id: "double-comfort",
            name: "Doble Confort (202)",
            plans: [
                { baseCop: [111000, 169000], discountCop: [85000, 130000], discountEnabled: [true, true] },
                { baseCop: [124000, 195000], discountCop: [95000, 150000], discountEnabled: [true, true] },
                { baseCop: [127000, 201000], discountCop: [97000, 154000], discountEnabled: [true, true] },
                { baseCop: [137000, 221000], discountCop: [105000, 170000], discountEnabled: [true, true] }
            ]
        },
        {
            id: "individual-business",
            name: "Individual Business (101)",
            plans: [
                { baseCop: [98000], discountCop: [75000], discountEnabled: [true] },
                { baseCop: [111000], discountCop: [85000], discountEnabled: [true] },
                { baseCop: [114000], discountCop: [87000], discountEnabled: [true] },
                { baseCop: [124000], discountCop: [95000], discountEnabled: [true] }
            ]
        }
    ]
};
