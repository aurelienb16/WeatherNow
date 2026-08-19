import { fetchWeatherApi } from "openmeteo";

export async function getWeather(latitude, longitude) {

    const params = {
        latitude: latitude,
        longitude: longitude,
        current: ["temperature_2m", "precipitation", "wind_speed_10m", "relative_humidity_2m", "apparent_temperature"],
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();


    const current = response.current();

    const weatherData = {
        current: {
            time: new Date(
                (Number(current.time()) + utcOffsetSeconds) * 1000
            ),
            temperature_2m: current.variables(0).value(),
            precipitation: current.variables(1).value(),
            wind_speed_10m: current.variables(2).value(),
            relative_humidity_2m: current.variables(3).value(),
            apparent_temperature: current.variables(4).value(),
        },
    };

    return weatherData;
}