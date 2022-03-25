import * as TelegramBot from "node-telegram-bot-api"
require('dotenv').config()

import { MessageController, WeatherController } from "./Controllers"

const bot = new TelegramBot(process.env.BOT_TOKEN, {
	polling: true,
})

const messageController = new MessageController(bot, 'HTML')
const weatherController = new WeatherController(process.env.WEATHER_TOKEN)

bot.setMyCommands([
	{ command: '/author', description: 'информация о создателе бота' },
	{ command: '/functions', description: 'как работает бот' },
])
	.catch(console.error)

bot.onText(/\/start/,async ctx => {
	await messageController.sendStartMessage(ctx)
})
bot.onText(/\/author/,async ctx => {
	await messageController.sendAuthorMessage(ctx)
})
bot.onText(/\/functions/,async ctx => {
	await messageController.sendFunctionalMessage(ctx)
})

bot.on('callback_query', async ctx => {
	switch (ctx.data) {
		case 'start': {
			await messageController.sendStartMessage(ctx.message)
			break
		}
		case 'functions': {
			await messageController.sendFunctionalMessage(ctx.message)
			break
		}
		case 'author': {
			await messageController.sendAuthorMessage(ctx.message)
			break
		}
		case 'delete': {
			await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id.toString())
				.catch(console.error)
		}
	}
})

bot.on('location', async ctx => {
	const languageCode = ctx.from.language_code

	weatherController.setLanguage(languageCode)
	const weather = await weatherController.getCurrentWeather(ctx.location.latitude, ctx.location.longitude)

	await messageController.sendWeatherMessage(ctx, weather)
})