const apiKey = "4a768f53535d07bbe011bf0ffac39aot";

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const currentWeatherURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  const forecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  // Current Weather
  fetch(currentWeatherURL)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("city-name").textContent = `${data.city}, ${data.country}`;
      document.getElementById("temperature").textContent = `🌡️ Temperature: ${data.temperature.current}°C`;
      document.getElementById("description").textContent = `🌤️ Condition: ${data.condition.description}`;
      document.getElementById("wind").textContent = `🍃 Wind Speed: ${data.wind.speed} km/h`;
      document.getElementById("weather-icon").src = data.condition.icon_url;
    })
    .catch((error) => {
      console.error("Error fetching current weather:", error);
      alert("Unable to get current weather data.");
    });

  // Forecast
  fetch(forecastURL)
    .then((response) => response.json())
    .then((data) => {
      const forecastContainer = document.getElementById("forecast");
      forecastContainer.innerHTML = ""; 

      // Show first 5 days (including today)
      data.daily.slice(0, 5).forEach((day) => {
        const date = new Date(day.time * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

        const card = document.createElement("div");
        card.className = "forecast-card";

        card.innerHTML = `
          <h4>${dayName}</h4>
          <img src="${day.condition.icon_url}" alt="${day.condition.description}" />
          <p>${day.temperature.minimum}°C / ${day.temperature.maximum}°C</p>
        `;

        forecastContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching forecast:", error);
      alert("Unable to get forecast data.");
    });
});

