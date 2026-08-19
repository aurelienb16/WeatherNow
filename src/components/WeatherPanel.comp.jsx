import { useState } from 'react';
import { useEffect } from 'react';
import { getWeather } from "../api/weather";


import "../style/WeatherPanel.css";


function WeatherPanel({ latitude, longitude }) {

    const [weatherData, setData] = useState(null);

    useEffect(() => {

        async function loadWeatherData() {
            const data = await getWeather(latitude, longitude);
            setData(data);
        }

        loadWeatherData();

    }, [latitude, longitude]);

    if (!weatherData) {
        return (

            <div className="weather-panel">Loading...</div>

        )
    }

    return (

        <div className="weather-panel">

            <div className='header'>
                <div className='title'>
                    <h2>Paris</h2>
                </div>

                <div className="temperature-container">
                    <div className='temperature'>
                        {weatherData.current.temperature_2m.toFixed(1)}
                    </div>
                    <div className='unit'>
                        °
                    </div>
                </div>
            </div>

            <div className='content'>

                <div className='item'>
                    <div className='label'>Feels like:</div>
                    <div className='data'>
                        {weatherData.current.apparent_temperature.toFixed(1)}°
                    </div>
                </div>

                <div className='item'>
                    <div className='label'>Precipitation:</div>
                    <div className='data'>
                        {weatherData.current.precipitation} mm
                    </div>
                </div>

                <div className='item'>
                    <div className='label'>Wind Speed:</div>
                    <div className='data'>
                        {weatherData.current.wind_speed_10m.toFixed(0)} km/h
                    </div>
                </div>

                <div className='item'>
                    <div className='label'>Humidity:</div>
                    <div className='data'>
                        {weatherData.current.relative_humidity_2m}%
                    </div>
                </div>

            </div>


        </div>

    );

};

export default WeatherPanel;