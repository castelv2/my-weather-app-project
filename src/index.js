function formatDate(date) {
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

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML =
    Math.round(response.data.main.temp) + "°C";
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "44c7059c44fdb77118bc532e55239657";
  let city = document.querySelector("#city-input").value;
  console.log(city);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let date = document.querySelector("h2");
let now = new Date();
date.innerHTML = formatDate(now);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let apiKey = "44c7059c44fdb77118bc532e55239657";
let units = "metric";
let cityInputs = document.querySelector("#city-input");

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
