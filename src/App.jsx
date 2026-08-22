import { useEffect, useState } from "react";
import Header from './components/Header.comp';
import WeatherPanel from './components/WeatherPanel.comp';

import './style/App.css';
import { getGeocoding } from "./api/geocoding";
import CitySearchBar from "./components/CitySearchBar.comp";

function App() {

  const [cities, setCities] = useState([
    "My Position", "Paris", "New York", "Tokyo", "London"
  ]);
  const [locations, setLocations] = useState([]);

  // --------------------
  // INITIALIZE LOCATIONS
  // --------------------
  useEffect(() => {

    async function loadCities() {
      try {
        const data = await Promise.all(
          cities.map(getGeocoding)
        );

        setLocations(data);
      } catch (error) {
        console.error(error);
      }

      // Removing locations that were unsuccessfully fetched
      setLocations(locations => locations.filter(loc => loc !== null));
    }

    loadCities();

  }, [cities]);

  // --------------------
  // AUXILIARY FUNCTIONS
  // --------------------

  const removeCity = cityName => {
    setCities(cities => cities.filter(city => city !== cityName));
  };

  const saveCity = cityName => {
    if (!cities.includes(cityName)) {
      setCities(cities => [...cities, cityName]);
    }
  }

  // --------------------
  // APP COMPONENT
  // --------------------

  return (

    <div className="page">

      <div className="app-header">
        <Header />
      </div>

      <CitySearchBar saveCity={saveCity} />

      <div className="app-main">

        {locations.map(location => (
          <WeatherPanel key={location.id} id={location.id} city={location.name}
            latitude={location.latitude} longitude={location.longitude}
            removeCity={removeCity} />
        ))}

      </div>

    </div>

  );
};

export default App;