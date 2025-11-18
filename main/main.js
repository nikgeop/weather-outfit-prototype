document.addEventListener("DOMContentLoaded", () => {
  const mainPage = document.getElementById("main-page");
  const weatherPage = document.getElementById("weather-report-page");
  const addClothingPage = document.getElementById("add-clothing-page");

  // Buttons
  const leftButton = document.querySelector(".top-bar #weather-scroll-left");
  const rightButton = document.querySelector(".top-bar #weather-scroll-right");
  const back1 = document.getElementById("back-to-main-1");
  const back2 = document.getElementById("back-to-main-2");

  // Go to weather report
  leftButton.addEventListener("click", () => {
    mainPage.style.display = "none";
    weatherPage.style.display = "flex";
  });

  // Go to add clothing
  rightButton.addEventListener("click", () => {
    mainPage.style.display = "none";
    addClothingPage.style.display = "flex";
  });

  // Back to main
  back1.addEventListener("click", () => {
    weatherPage.style.display = "none";
    mainPage.style.display = "flex";
  });
  back2.addEventListener("click", () => {
    addClothingPage.style.display = "none";
    mainPage.style.display = "flex";
  });

  // Clothing logic
  const shirtSlot = document.getElementById("shirt");
  const pantsSlot = document.getElementById("pants");
  const shoesSlot = document.getElementById("shoes");

  let currentTemp = 15; // default if weather fails

  function copyBackground(fromId, toElement) {
    const source = document.getElementById(fromId);
    if (!source) return;

    const background = source.style.backgroundImage;

    toElement.style.backgroundImage = background;
    toElement.style.backgroundSize = "cover";
    toElement.style.backgroundPosition = "center";
    toElement.style.backgroundRepeat = "no-repeat";
  }

  function setOutfit() {
    copyBackground("neutral-shirt-1", shirtSlot);
    copyBackground("neutral-pants-2", pantsSlot);
    copyBackground("neutral-shoes-3", shoesSlot);
  }

  setOutfit();

  const refreshButton = document.getElementById("refresh-button");

  //  Refresh button 
  function refreshOutfit() {
    let category = "";

    if (currentTemp <= 10) category = "cold";
    else if (currentTemp >= 25) category = "hot";
    else category = "neutral";

    function pick(list) {
      return list[Math.floor(Math.random() * list.length)];
    }

    const shirts = Array.from(
      document.querySelectorAll(
        `#closet .clothes[id*='${category}-shirt'],
         #closet .clothes[id*='${category}-top'],
         #closet .clothes[id*='${category}-jacket'],
         #closet .clothes[id*='${category}-sweater']`
      )
    );

    const pants = Array.from(
      document.querySelectorAll(
        `#closet .clothes[id*='${category}-pants'],
         #closet .clothes[id*='${category}-jeans'],
         #closet .clothes[id*='${category}-cargos'],
         #closet .clothes[id*='${category}-shorts'],
         #closet .clothes[id*='${category}-bottom']`
      )
    );

    const shoes = Array.from(
      document.querySelectorAll(
        `#closet .clothes[id*='${category}-shoes'],
         #closet .clothes[id*='${category}-boots'],
         #closet .clothes[id*='${category}-slides'],
         #closet .clothes[id*='${category}-footwear']`
      )
    );

    const chosenShirt = pick(shirts);
    const chosenPants = pick(pants);
    const chosenShoes = pick(shoes);

    if (chosenShirt) copyBackground(chosenShirt.id, shirtSlot);
    if (chosenPants) copyBackground(chosenPants.id, pantsSlot);
    if (chosenShoes) copyBackground(chosenShoes.id, shoesSlot);
  }

  refreshButton.addEventListener("click", refreshOutfit);

  async function loadWeather() {
    const lat = 49.2497;
    const lon = -123.1193;
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&timezone=auto`
      );
      const data = await response.json();
      const currentHour = new Date().getHours();
      const weatherContainer = document.querySelector(".weather-container");
      weatherContainer.innerHTML = "";

      // this updates the temperature for outfit selection
      currentTemp = Math.round(data.hourly.temperature_2m[currentHour]);

      for (let i = currentHour; i < currentHour + 8; i++) {
        const temp = Math.round(data.hourly.temperature_2m[i]);
        const code = data.hourly.weathercode[i];

        const timeLabel = new Date(data.hourly.time[i]).toLocaleTimeString("en-US", {
          hour: "numeric"
        });

        const slot = document.createElement("div");
        slot.className = "weather-slot";
        slot.innerHTML = `
          <div style="font-size: min(1.5vw, 1.5vh)">${timeLabel}</div>
          <div style="font-size: min(2vw, 2vh)">${getWeatherEmoji(code)}</div>
          <div style="font-size: min(1.5vw, 1.5vh)">${temp}°C</div>
        `;
        weatherContainer.appendChild(slot);
      }
    } catch (error) {
      console.error("Weather load failed:", error);
    }

    function getWeatherEmoji(code) {
      if (code <= 3) return "☁️";
      if (code <= 48) return "🌫️";
      if (code <= 67) return "🌧️";
      if (code <= 77) return "❄️";
      if (code <= 82) return "🌧️";
      if (code >= 95) return "⛈️";
      return "☀️";
    }

    const scrollLeftBtn = document.getElementById("scroll-arrow-left");
    const scrollRightBtn = document.getElementById("scroll-arrow-right");
    const wContainer = document.querySelector(".weather-container");
    if (scrollLeftBtn && scrollRightBtn && wContainer) {
      scrollLeftBtn.addEventListener("click", () => {
        wContainer.scrollBy({ left: -100, behavior: "smooth" });
      });
      scrollRightBtn.addEventListener("click", () => {
        wContainer.scrollBy({ left: 100, behavior: "smooth" });
      });
    }
  }

  loadWeather();
});
