const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

function describe(code) {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 95) return "Thunderstorm";
  return "Unknown";
}

async function getWeather() {
  const city = cityInput.value.trim();
  if (city === "") return;

  result.innerHTML = "<p>Loading...</p>";

  try {
    const geoUrl =
      "https://geocoding-api.open-meteo.com/v1/search?name=" +
      encodeURIComponent(city) +
      "&count=1";
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results) {
      result.innerHTML = '<p class="error">City not found.</p>';
      return;
    }

    const place = geoData.results[0];

    const weatherUrl =
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      place.latitude +
      "&longitude=" +
      place.longitude +
      "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code";
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();
    const now = weatherData.current;

    result.innerHTML =
      '<div class="card">' +
      "<h2>" + place.name + ", " + place.country + "</h2>" +
      '<div class="temp">' + Math.round(now.temperature_2m) + "°C</div>" +
      "<p>" + describe(now.weather_code) + "</p>" +
      "<p>Humidity: " + now.relative_humidity_2m + "%</p>" +
      "<p>Wind: " + now.wind_speed_10m + " km/h</p>" +
      "</div>";
  } catch (error) {
    result.innerHTML = '<p class="error">Something went wrong. Check your internet.</p>';
  }
}

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") getWeather();
