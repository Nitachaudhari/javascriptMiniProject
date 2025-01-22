const API_KEY = '6362d5178a530b4bee49502a35d9f11d';  
const currentWeather = document.getElementById('currentWeather');
const forecast = document.getElementById('forecast');
let theme = localStorage.getItem('theme') || 'light-theme';
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

document.body.classList.add(theme);

function debounceSearch() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(fetchWeather, 1000);
}

// Fetch Weather Data
async function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        displayCurrentWeather(data);

        if (!recentSearches.includes(city)) {
            recentSearches.push(city);
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Display Current Weather
function displayCurrentWeather(data) {
    currentWeather.innerHTML = `
        <h2>${data.name}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
    `;
}

// Toggle Theme
function toggleTheme() {
    theme = theme === 'light-theme' ? 'dark-theme' : 'light-theme';
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', theme);
}

// Load Previous Theme and Searches
function loadPreferences() {
    document.body.classList.add(localStorage.getItem('theme') || 'light-theme');
    recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    recentSearches.forEach(city => {
        // Optional: display recent searches in a list
    });
}

loadPreferences();