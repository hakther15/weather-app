let now = new Date();
let searchEngine = document.querySelector("#search-form");
let apiKey = "b4d94ed61b2db6baa9789149670b85e3";
let currentLocationButton = document.querySelector("#button");
let units = "imperial";
let temperatureElement = document.querySelector("#temperature");
let searchedCity = document.querySelector("#location-name");
let humidity = document.querySelector("#humidity");
let winds = document.querySelector("#winds");
let feelsLike = document.querySelector("#feels-like");
let cityInput = document.querySelector("#city-input");
let tempHi = document.querySelector("#temp-hi");
let tempLo = document.querySelector("#temp-lo");
let weatherType = document.querySelector("#weather-type");

function formatDate(date) {
  let hours = now.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${day} ${hours}:${minutes}`;
}
formatDate();

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let weatherFeel = Math.round(response.data.main.feels_like);
  let loTemp = Math.round(response.data.main.temp_min);
  let hiTemp = Math.round(response.data.main.temp_max);
  let cityName = response.data.name;
  let countryName = response.data.sys.country;
  searchedCity.innerHTML = `${cityName}, ${countryName}`;
  temperatureElement.innerHTML = `${temperature}° `;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  winds.innerHTML = `${windSpeed}`;
  feelsLike.innerHTML = `${weatherFeel}°F`;
  tempLo.innerHTML = `${loTemp} °F`;
  tempHi.innerHTML = `${hiTemp} °F`;
  weatherType.innerHTML = `${response.data.weather[0].description}`;
}

function getCurrentTemperatureOnCity(event) {
  event.preventDefault();

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios
    .get(`${apiUrl}`)
    .then(showTemperature)
    .catch(function (err) {
      searchedCity.innerHTML = null;
    });
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocationSearch(event) {
  event.preventDefault();
}
navigator.geolocation.getCurrentPosition(retrievePosition);

searchEngine.addEventListener("submit", getCurrentTemperatureOnCity);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

button.addEventListener("click", currentLocationSearch);
getCurrentTemperatureOnCity("Cleveland");
