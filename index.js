import "./styles.css";

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let hour = now.getHours();
let minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();

let currentDate = document.querySelector("h3");
currentDate.innerHTML = `${day}, ${hour}:${minutes}`;

function submission(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  console.log(searchInput.value);
  let h4 = document.querySelector("h4");
  h4.innerHTML = searchInput.value;

  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "1943ae1fbf713bbb319c183a2d2ae129";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submission);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = "17";
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = "66";
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${temperature}`;
  let h4 = document.querySelector("h4");
  h4.innerHTML = response.data.name;
}

function retrievePosition(position) {
  let apiKey = "1943ae1fbf713bbb319c183a2d2ae129";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
  let currentInput = document.querySelector("current-search");
  let h4 = document.querySelector("h4");
  h4.innerHTML = currentInput.value;
}

let button = document.querySelector("#current-search");
button.addEventListener("click", getCurrentPosition);
