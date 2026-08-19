import { useEffect, useState } from "react";
import Header from './components/Header.comp';
import WeatherPanel from './components/WeatherPanel.comp';

import './style/App.css';
import { getGeocoding } from "./api/geocoding";

function App() {
  
  const [cities, setCities] = useState([
    "Paris", "New York", "Tokyo", "London"
  ]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {

    async function loadCities() {
      try {
        const data = await Promise.all(
          cities.map(getGeocoding)
        );

        setLocations(data);

        const validCities = cities.filter(city =>
          data.some(location => city === location.name)
        );

        setCities(validCities);
      } catch (error) {
        console.error(error);
      }
    }

    loadCities();

  }, [cities]);

  return (

    <div className="page">

      <div className="app-header">
        <Header />
      </div>

      <div className="app-main">
        
        {locations.map(location => (
          <WeatherPanel key={location.id} city={location.name} 
          latitude={location.latitude} longitude={location.longitude} />
        ))}

      </div>

    </div>

  );
};

export default App;