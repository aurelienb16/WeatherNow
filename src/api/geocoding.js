

export async function getGeocoding(city) {

    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(`No match found for '${city}'`);
    }

    const result = data.results[0];

    const CityData = {
        "id": result.id,
        "name": result.name,
        "latitude": result.latitude,
        "longitude": result.longitude,
        "timezone": result.timezone,
    };

    return CityData;

}