import { useState } from "react";
import Header from './components/Header.comp';
import WeatherPanel from './components/WeatherPanel.comp.jsx';

import './style/App.css';

function App() {
  const [latitude, setLatitude] = useState(48.85341);
  const [longitude, setLongitude] = useState(2.3488);

  return (

    <div className="page">

      <div className="app-header">
        <Header />
      </div>

      <div className="app-main">
        <WeatherPanel
          latitude={latitude}
          longitude={longitude} />

        <WeatherPanel
          latitude={latitude}
          longitude={longitude} />

        <WeatherPanel
          latitude={latitude}
          longitude={longitude} />

        <WeatherPanel
          latitude={latitude}
          longitude={longitude} />


      </div>

    </div>

  );
};

export default App;