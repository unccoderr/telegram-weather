import * as TelegramBot from "node-telegram-bot-api"
import { bold } from "../Utils"

import { CurrentResponse } from "openweathermap-ts/dist/types"
import { Message } from "node-telegram-bot-api";

export class MessageController {
	_bot: TelegramBot
	_parseMode: TelegramBot.ParseMode

	constructor(bot: TelegramBot, parseMode: TelegramBot.ParseMode) {
		this._bot = bot
		this._parseMode = parseMode
	}

	sendStartMessage = async (ctx: Message) => {
		const chatID = ctx.chat.id
		const messageId = ctx.message_id.toString()

		const text = `${bold('Привет! 👋')}\n\n`
		+ `Этот бот позволяет смотреть погоду, прямо не выходя из Telegram!`

		await this._bot.deleteMessage(chatID, messageId)
			.catch(console.error)
		await this._bot.sendMessage(chatID, text, {
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
			.catch(e => console.error('send start msg error: ', e))
	}
	sendAuthorMessage = async (ctx: Message) => {
		const chatID = ctx.chat.id
		const messageID = ctx.message_id.toString()

		await this._bot.deleteMessage(chatID, messageID)

		const text = `${bold('Я fullstack-разработчик. Создаваю сайты, ботов и различной сложжности')}`
		await this._bot.sendMessage(chatID, text, {
			parse_mode: this._parseMode,
			reply_markup: {
				inline_keyboard: [
					[
						{ text: 'Мои работы', pay: true, url: 'https://t.me/unccoder_work' },
						{ text: 'Мой сайт', pay: true, url: 'https://unccoder.ru' }
					],
					[
						{ text: 'Назад', callback_data: 'start' }
					]
				]
			}
		})
	}
	sendFunctionalMessage = async (ctx: Message) => {
		const chatID = ctx.chat.id
		const messageID = ctx.message_id.toString()

		const text = `${bold('Смотри погоду, не выходя из Telegram.')}\n\nПришли геометку боту, а он расскажет, что на погодном фронте 😉`

		await this._bot.deleteMessage(chatID, messageID)
		await this._bot.sendMessage(chatID, text, {
			parse_mode: this._parseMode,
			reply_markup: {
				inline_keyboard: [
					[
						{ text: 'Назад', callback_data: 'start' },
						{ text: 'Удалить', callback_data: 'delete' }
					]
				]
			}
		})
	}
	sendWeatherMessage = async (ctx: Message, weather: CurrentResponse) => {
		const chatID = ctx.chat.id

		const getWeatherDirection = () => {
			const angle = weather.wind.deg
			if (22.5 > angle && angle > 337.5) return 'Восточный'
			if (22.5 <= angle && angle <= 67.5) return 'Северо-восточный'
			if (112.5 > angle && angle > 67.5) return 'Северный'
			if (112.5 <= angle && angle <= 157.5) return 'Северо-западный'
			if (157.5 < angle && angle < 247.5) return 'Западный'
			if (202.5 <= angle && angle <= 247.5) return 'Юго-западный'
			if (247.5 < angle && angle < 292.5) return 'Югожный'
			if (292.5 <= angle && angle <= 337.5) return 'Юго-восточный'
		}
		const getDescription = () => bold(weather.weather[0].description[0].toUpperCase() + weather.weather[0].description.slice(1))
		const getVisibility = () => weather.visibility >= 1000 ? (weather.visibility / 1000).toFixed(1) + ' км' : weather.visibility + ' м'
		const getTime = (date: Date) => {
			const minutes = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes()
			return date.getHours() + ':' + minutes
		}

		const text = `${getDescription()}\n\n`
			+ `🌡 ${bold('Температура')} ${weather.main.temp_min.toFixed(0)}°С (${weather.main.temp_min.toFixed(1)}°С - ${weather.main.temp_max.toFixed(1)}°С)\n\n`
			+ `🎈 ${bold(getWeatherDirection() + ' ветер')}, ${weather.wind.speed.toFixed(0)} м/с\n\n `
			+ `☁️ ${bold('Облачность')} ${weather.clouds.all.toFixed(0)}%\n\n `
			+ `💦 ${bold('Влажность')} ${weather.main.humidity}%\n\n`
			+ `⛰️ ${bold('Давление')} ${weather.main.pressure} мм рт.ст\n\n`
			+ `👀 ${bold('Видимость')} ${getVisibility()}\n\n`
			+ `🌅 ${bold('Рассвет')} в ${getTime(new Date(weather.sys.sunrise * 1000))}\n\n`
			+ `🌇 ${bold('Закат')} в ${getTime(new Date(weather.sys.sunset * 1000))}\n\n`
			+ `🗺️ Чтобы вновь узнать актуальную информацию о погоде, пришлите геопощицию снова`
		await this._bot.deleteMessage(chatID, ctx.message_id.toString())
		await this._bot.sendMessage(chatID, text, {
			parse_mode: this._parseMode,
			reply_markup: {
				inline_keyboard: [
					[
						{ text: 'Удалить', callback_data: 'delete' }
					]
				]
			}
		})
	}
}