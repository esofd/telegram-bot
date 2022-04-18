const TelegramApi = require("node-telegram-bot-api");
const {gameOptions, againOptions} = require("./options");

const token = "5228926322:AAE1vtBcsXUItTHiZv6KGPy6bRlAt6Za3KY";
const bot = new TelegramApi(token, { polling: true });



const chats = {}

const HuDict = {
    "хуямень": "хуямень",
    "хуёжницы": "хуёжницы",
    "хуяга": "хуягу",
}

const HuList = ["хуямень", "хуёжницы", "хуяга"];

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "Сыграем в 'хуямень, хуёжницы, хуягу'? Раз, два, три!");
    const choose = Math.floor(Math.random() * 3);
    chats[chatId] = choose;
    await bot.sendMessage(chatId, "Поехали!", gameOptions);
}

const start = () => {
    bot.setMyCommands([
        { command: "/start", description: "Начальное приветствие" },
        { command: "/game", description: "Сыграть в 'хуямень, хуёжницы, хуягу'" },
    ]);
    bot.on("message", async msg => {
        console.log(msg);
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === "/start") {
            return bot.sendMessage(chatId, "Тебя сюда не звали");
        }
        if (text === "/game") {
            return startGame(chatId);
        }
        else {
            return bot.sendMessage(chatId, "Пошёл нахуй");
        }
    });
    
    bot.on("callback_query", async msg => {
        console.log(msg);
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === "/again") {
            return startGame(chatId);
        }
        await bot.sendMessage(chatId, `Ты выбрал ${HuDict[data]}, а у меня ${HuList[chats[chatId]]}`);
        const userChoose = HuList.indexOf(data);
        const botChoose = chats[chatId];
        const result = (userChoose - botChoose + HuList.length) % HuList.length;

        if (result === 0) {
            return bot.sendMessage(chatId, "Ничья, ёбана!", againOptions);
        }
        if (result === 1) {
            return bot.sendMessage(chatId, "Соси, чмо!", againOptions);
        }
        if (result === 2) {
            return bot.sendMessage(chatId, "Чёрная магия! Колдун ебучий!", againOptions);
        }
    });
};

start();