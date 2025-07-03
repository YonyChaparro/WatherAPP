const API_KEY = "8fa846d2c690b1e7d7f62635296c8e03";

document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const errorElem = document.getElementById("error");
  const weatherInfo = document.getElementById("weatherInfo");

  if (!city) {
    errorElem.textContent = "Por favor, escribe una ciudad válida.";
    weatherInfo.classList.add("hidden");
    return;
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
          lang: "es",
        },
      }
    );

    const data = response.data;

    // Obtener tiempo actual en segundos y calcular si es de día o de noche
    const now = data.dt;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const isDay = now >= sunrise && now < sunset;

    // Cambiar estilo según el momento del día
    const body = document.body;
    if (isDay) {
      body.className =
        "bg-gradient-to-br from-yellow-100 via-yellow-300 to-orange-400 min-h-screen flex items-center justify-center p-6 text-gray-800 transition-all";
    } else {
      body.className =
        "bg-gradient-to-br from-indigo-900 via-purple-800 to-black min-h-screen flex items-center justify-center p-6 text-white transition-all";
    }

    // Mostrar toda la información
    document.getElementById("description").textContent =
      "🌤️ " + data.weather[0].description;
    document.getElementById("temperature").textContent =
      "🌡️ Temperatura: " + data.main.temp + " °C";
    document.getElementById("feels_like").textContent =
      "🥵 Sensación térmica: " + data.main.feels_like + " °C";
    document.getElementById("temp_range").textContent =
      `🔺 Máx: ${data.main.temp_max} °C | 🔻 Mín: ${data.main.temp_min} °C`;
    document.getElementById("humidity").textContent =
      "💧 Humedad: " + data.main.humidity + "%";
    document.getElementById("wind").textContent =
      `🌬️ Viento: ${data.wind.speed} m/s, dirección ${data.wind.deg}°`;
    document.getElementById("coords").textContent =
      `📍 Coordenadas: [${data.coord.lat}, ${data.coord.lon}]`;
    document.getElementById("sun").textContent =
      `🌅 Amanecer: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()} | 🌇 Atardecer: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;

    weatherInfo.classList.remove("hidden");
    errorElem.textContent = "";
  } catch (err) {
    errorElem.textContent = "❌ No se pudo obtener el clima. Intenta con otra ciudad.";
    weatherInfo.classList.add("hidden");
  }
});
