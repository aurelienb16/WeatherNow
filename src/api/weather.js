import { fetchWeatherApi } from "openmeteo";

export async function getWeather(latitude, longitude) {

    const params = {
        latitude: latitude,
        longitude: longitude,
        current: "temperature_2m",
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
        },
    };

    return weatherData;
}