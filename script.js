// script.js

const apiKey = '62cc9ce50b4884771a6f0d02d27cd1ea'; // Replace with your OpenWeatherMap API key
const weatherResult = document.getElementById('weatherResult');
const cityInput = document.getElementById('cityInput');
const getWeatherButton = document.getElementById('getWeather');

getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        weatherResult.innerHTML = `<p>Please enter a city name.</p>`;
    }
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found`);
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const description = weather[0].description;
    const temp = main.temp;
    const humidity = main.humidity;

    weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
    `;
}
