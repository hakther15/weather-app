let now = new Date();
let currentLocationButton = document.querySelector(".locationButton");
let searchEngine = document.querySelector("#search-form");
let apiKey = "b4d94ed61b2db6baa9789149670b85e3";
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
let iconElement = document.querySelector("#icon");

function formatDate(date) {
  console.log(date);
  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
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

  return `${day} ${hours}:${minutes}`;
}

let h1 = document.querySelector("h1");
h1.innerHTML = formatDate(now);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  response.data.daily.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDate(
          new Date(forecastDay.dt * 1000)
        )}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}°F /</span>
          <span class="temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}°F </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b4d94ed61b2db6baa9789149670b85e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let weatherFeel = Math.round(response.data.main.feels_like);
  let loTemp = Math.round(response.data.main.temp_min);
  let hiTemp = Math.round(response.data.main.temp_max);
  let cityName = response.data.name;
  let countryName = response.data.sys.country;
  let iconType = response.data.weather[0].icon;
  searchedCity.innerHTML = `${cityName}, ${countryName}`;
  temperatureElement.innerHTML = `${temperature}° `;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  winds.innerHTML = `${windSpeed}`;
  feelsLike.innerHTML = `${weatherFeel}°F`;
  tempLo.innerHTML = `${loTemp} °F`;
  tempHi.innerHTML = `${hiTemp} °F`;
  weatherType.innerHTML = `${response.data.weather[0].description}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconType}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].icon);

  fahrenheitTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  getCurrentTemperatureOnCity(cityInput.value);
}

function getCurrentTemperatureOnCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios
    .get(`${apiUrl}`)
    .then(showTemperature)
    .catch(function (err) {
      `Unable to fetch weather information for ${city}`;
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

searchEngine.addEventListener("submit", handleSubmit);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let fahrenheitTemperature = null;

function convertToCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}° `;
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}° `;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

currentLocationButton.addEventListener("click", currentLocationSearch);
getCurrentTemperatureOnCity("Cleveland");
