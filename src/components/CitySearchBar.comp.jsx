import { useState } from "react";
import { getGeocoding } from "../api/geocoding";
import '../style/CitySearchBar.css';

function CitySearchBar({saveCity}) {

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        
        try {
            const CityData = await getGeocoding(query.trim());
            saveCity(CityData.name);            
        } catch (err) {
            const message = `Could not find the requested city: ${query.trim()}`;
            alert(message);
        } finally {
            setLoading(false);
            setQuery("");
        }
    } 


    return (
        <div className="city-search-bar">
            <form onSubmit={handleSubmit}>

                <input
                    type="search"
                    value={query}
                    placeholder="Add a city..."
                    onChange={(event) => setQuery(event.target.value)}
                />

                <button type="submit" disabled={loading}>
                    Search
                </button>

            </form>
        </div>
    );
}

export default CitySearchBar;