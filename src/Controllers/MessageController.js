"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
var Utils_1 = require("../Utils");
var MessageController = /** @class */ (function () {
    function MessageController(bot, parseMode) {
        var _this = this;
        this.sendStartMessage = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var chatID, messageId, text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatID = ctx.chat.id;
                        messageId = ctx.message_id.toString();
                        text = "".concat((0, Utils_1.bold)('Привет! 👋'), "\n\n")
                            + "\u042D\u0442\u043E\u0442 \u0431\u043E\u0442 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u043E\u0433\u043E\u0434\u0443, \u043F\u0440\u044F\u043C\u043E \u043D\u0435 \u0432\u044B\u0445\u043E\u0434\u044F \u0438\u0437 Telegram!";
                        return [4 /*yield*/, this._bot.deleteMessage(chatID, messageId)
                                .catch(console.error)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._bot.sendMessage(chatID, text, {
                                parse_mode: this._parseMode,
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: 'Что я могу?', callback_data: 'functions' },
                                            { text: 'Автор', callback_data: 'author' }
                                        ]
                                    ]
                                }
                            })
                                .catch(function (e) { return console.error('send start msg error: ', e); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.sendAuthorMessage = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var chatID, messageID, text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatID = ctx.chat.id;
                        messageID = ctx.message_id.toString();
                        return [4 /*yield*/, this._bot.deleteMessage(chatID, messageID)];
                    case 1:
                        _a.sent();
                        text = "".concat((0, Utils_1.bold)('Я fullstack-разработчик. Создаваю сайты, ботов и различной сложжности'));
                        return [4 /*yield*/, this._bot.sendMessage(chatID, text, {
                                parse_mode: this._parseMode,
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: 'Мои работы', pay: true, url: 'https://t.me/unccoder_work' }
                                        ],
                                        [
                                            { text: 'Назад', callback_data: 'start' }
                                        ]
                                    ]
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.sendFunctionalMessage = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var chatID, messageID, text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatID = ctx.chat.id;
                        messageID = ctx.message_id;
                        text = "".concat((0, Utils_1.bold)('Смотри погоду, не выходя из Telegram.'), "\n\n\u041F\u0440\u0438\u0448\u043B\u0438 \u0433\u0435\u043E\u043C\u0435\u0442\u043A\u0443 \u0431\u043E\u0442\u0443, \u0430 \u043E\u043D \u0440\u0430\u0441\u0441\u043A\u0430\u0436\u0435\u0442, \u0447\u0442\u043E \u043D\u0430 \u043F\u043E\u0433\u043E\u0434\u043D\u043E\u043C \u0444\u0440\u043E\u043D\u0442\u0435 \uD83D\uDE09");
                        return [4 /*yield*/, this._bot.editMessageText(text, {
                                chat_id: chatID,
                                message_id: messageID,
                                parse_mode: this._parseMode
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._bot.editMessageReplyMarkup({
                                inline_keyboard: [
                                    [
                                        { text: 'Назад', callback_data: 'start' },
                                        { text: 'Понятно', callback_data: 'delete' }
                                    ]
                                ]
                            }, {
                                chat_id: chatID,
                                message_id: messageID
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.sendWeatherMessage = function (ctx, weather) { return __awaiter(_this, void 0, void 0, function () {
            var chatID, getWeatherDirection, getDescription, getVisibility, getTime, text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatID = ctx.chat.id;
                        getWeatherDirection = function () {
                            var angle = weather.wind.deg;
                            if (22.5 > angle && angle > 337.5)
                                return 'Восточный';
                            if (22.5 <= angle && angle <= 67.5)
                                return 'Северо-восточный';
                            if (112.5 > angle && angle > 67.5)
                                return 'Северный';
                            if (112.5 <= angle && angle <= 157.5)
                                return 'Северо-западный';
                            if (157.5 < angle && angle < 247.5)
                                return 'Западный';
                            if (202.5 <= angle && angle <= 247.5)
                                return 'Юго-западный';
                            if (247.5 < angle && angle < 292.5)
                                return 'Югожный';
                            if (292.5 <= angle && angle <= 337.5)
                                return 'Юго-восточный';
                        };
                        getDescription = function () { return (0, Utils_1.bold)(weather.weather[0].description[0].toUpperCase() + weather.weather[0].description.slice(1)); };
                        getVisibility = function () { return weather.visibility >= 1000 ? (weather.visibility / 1000).toFixed(1) + ' км' : weather.visibility + ' м'; };
                        getTime = function (date) {
                            var minutes = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
                            return date.getHours() + ':' + minutes;
                        };
                        text = "".concat(getDescription(), "\n\n")
                            + "\uD83C\uDF21 ".concat((0, Utils_1.bold)('Температура'), " ").concat(weather.main.temp_min.toFixed(0), "\u00B0\u0421 (").concat(weather.main.temp_min.toFixed(1), "\u00B0\u0421 - ").concat(weather.main.temp_max.toFixed(1), "\u00B0\u0421)\n\n")
                            + "\uD83C\uDF88 ".concat((0, Utils_1.bold)(getWeatherDirection() + ' ветер'), ", ").concat(weather.wind.speed.toFixed(0), " \u043C/\u0441\n\n ")
                            + "\u2601\uFE0F ".concat((0, Utils_1.bold)('Облачность'), " ").concat(weather.clouds.all.toFixed(0), "%\n\n ")
                            + "\uD83D\uDCA6 ".concat((0, Utils_1.bold)('Влажность'), " ").concat(weather.main.humidity, "%\n\n")
                            + "\u26F0\uFE0F ".concat((0, Utils_1.bold)('Давление'), " ").concat(weather.main.pressure, " \u043C\u043C \u0440\u0442.\u0441\u0442\n\n")
                            + "\uD83D\uDC40 ".concat((0, Utils_1.bold)('Видимость'), " ").concat(getVisibility(), "\n\n")
                            + "\uD83C\uDF05 ".concat((0, Utils_1.bold)('Рассвет'), " \u0432 ").concat(getTime(new Date(weather.sys.sunrise * 1000)), "\n\n")
                            + "\uD83C\uDF07 ".concat((0, Utils_1.bold)('Закат'), " \u0432 ").concat(getTime(new Date(weather.sys.sunset * 1000)), "\n\n")
                            + "\uD83D\uDDFA\uFE0F \u0427\u0442\u043E\u0431\u044B \u0432\u043D\u043E\u0432\u044C \u0443\u0437\u043D\u0430\u0442\u044C \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u043F\u043E\u0433\u043E\u0434\u0435, \u043F\u0440\u0438\u0448\u043B\u0438\u0442\u0435 \u0433\u0435\u043E\u043F\u043E\u0449\u0438\u0446\u0438\u044E \u0441\u043D\u043E\u0432\u0430";
                        return [4 /*yield*/, this._bot.sendMessage(chatID, text, {
                                parse_mode: this._parseMode,
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: 'Назад', callback_data: 'functions' }
                                        ]
                                    ]
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this._bot = bot;
        this._parseMode = parseMode;
    }
    return MessageController;
}());
exports.MessageController = MessageController;
//# sourceMappingURL=MessageController.js.map