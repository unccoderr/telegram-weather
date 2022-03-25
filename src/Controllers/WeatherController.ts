import OpenWeatherMap from "openweathermap-ts"
import { Language } from "openweathermap-ts/dist/types";

export class WeatherController {
	_openWeatherMap: OpenWeatherMap

	constructor(apiKey: string) {
		this._openWeatherMap = new OpenWeatherMap({
			apiKey,
			units: "metric"
		})
	}
	setLanguage = (language: string) => {
		this._openWeatherMap.setLanguage(language as Language)
	}
	getCurrentWeather = async (latitude: number, longitude: number) => {
		return this._openWeatherMap.getCurrentWeatherByGeoCoordinates(latitude, longitude)
	}
}
