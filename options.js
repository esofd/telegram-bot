module.exports = {
    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Хуямень", callback_data: "хуямень" }],
                [{ text: "Хуёжницы", callback_data: "хуёжницы" }],
                [{ text: "Хуяга", callback_data: "хуяга" }],
            ]
        }),
    },

    againOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Всё хуйня, давай по новой!", callback_data: "/again" }],
            ]
        }),
    }
};