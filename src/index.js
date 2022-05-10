function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
//let now = new Date();
//date.innerHTML = formatDate(now);

let date = document.querySelector("h2");
let now = new Date();

let apiKey = "44c7059c44fdb77118bc532e55239657";
let units = "metric";
let cityInputs = document.querySelector("#city-input");

//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

//read
function getForecast(coordinates) {
  let apiKey = "44c7059c44fdb77118bc532e55239657";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
//
function displayWeather(response) {
  celsiusTemperature = Math.round(response.data.main.temp);

  document.querySelector("#degree").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#time").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

// Use api key to retrieve info based on city-input in form
function searchCity(city) {
  let apiKey = "44c7059c44fdb77118bc532e55239657";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

//
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
  cityInputElement.value = "";
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Displays the searched city and its current temperature
function displayWeatherCondition(response) {
  alert("abc");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML =
    Math.round(response.data.main.temp) + "°C";
}

//
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-1">
          <div class="forecast-date">${formatDay(forecastDay.dt)}</div>

          <div class="day-icon">       
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="48"/>
         </div>

          <div class="weather-forecast-temperatures">
            <span class="forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span> 
            <span class="forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°</span> 
          </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  let fahrenheitTem = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTem);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

searchCity("Seoul");
