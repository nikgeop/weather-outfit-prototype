document.addEventListener("DOMContentLoaded", () => {
  const mainPage = document.getElementById("main-page");
  const weatherPage = document.getElementById("weather-report-page");
  const addClothingPage = document.getElementById("add-clothing-page");

  // Buttons
  const leftButton = document.querySelector("#weather-scroll-left");
  const rightButton = document.querySelector("#weather-scroll-right");
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
  // Get the container that holds weather slots
  const weatherContainer = document.querySelector(".weather-container");
  const scrollLeftArrow = document.getElementById("scroll-arrow-left");
  const scrollRightArrow = document.getElementById("scroll-arrow-right");
  scrollLeftArrow.addEventListener("click", () => {
    weatherContainer.scrollBy({left: -200, behavior: 'smooth'});
  });
  scrollRightArrow.addEventListener("click", () => {
    weatherContainer.scrollBy({left:200, behavior: 'smooth'});
  })
  const LAT = "49.2827";
  const LON = "-123.1207";
  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&hourly=temperature_2m,weathercode&timezone=auto`;
  /*fetches the weather data and updates html */
  async function getHourlyWeather(){
    weatherContainer.innerHTML = "<p style='padding: 20px; color: #555;'>Loading weather.. </p>";
    try {
      const response = await fetch(apiURL);
      if(!response.ok){
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      // clear out loading message 
      weatherContainer.innerHTML = "";
      for(let i = 0; i< 24; i++)
      {
        const hourData = {
          time: data.hourly.time[i],
          temp: data.hourly.temperature_2m[i],
          code: data.hourly.weathercode[i]
        };
        // Create a new "weather-slot" div
        const weatherSlot = createWeatherSlot(hourData);
        weatherContainer.appendChild(weatherSlot);
      }
    } catch (error) {
        console.error("Error fetching weather:", error);
        weatherContainer.innerHTML = `<p style='padding: 20px; color: red;'>Could not load weather data.</p>`;

    }
  }
  // create a new html element for a single hour of weather
function createWeatherSlot(hourData)
{
  const slot = document.createElement("div");
  slot.className = "weather-slot";
  // we only need 23:00 part 
  const data = new Date(hourData.time);
  let hour = data.getHours();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour%12;
  hour = hour ? hour : 12; // '0' should be '12'
  const timeString = `${hour}${ampm}`;
  //emoji 
  const emoji = getWeatherEmoji(hourData.code);
  // temp
  const temp = `${Math.round(hourData.temp)}°C`;
  slot.innerHTML = `
    <div style="font-size: 0.7rem; font-weight: 500;">${timeString}</div>
    <div style="font-size: 1.25rem;">${emoji}</div>
    <div style="font-size: 0.75rem; font-weight: 600;">${temp}</div>
     `;
  return slot;
}
function getWeatherEmoji(code) {
  if(code == 0) return '☀️';
  if(code>=1 && code <= 3) return '⛅';
  if(code>=45 && code <= 48) return '🌫️';
  if(code>=51 && code <= 67) return '🌧️';
  if(code>=71 && code <= 77) return '❄️';
  if(code>= 80 && code <= 82) return '🌦️';
  if(code>= 85 && code<= 86) return '🌨️';
  if(code>= 95) return '⛈️';
  return 'damn bro';
}
getHourlyWeather();
});

  const shirtSlot = document.getElementById("shirt");
  const pantsSlot = document.getElementById("pants");
  const shoesSlot = document.getElementById("shoes");

  //helper for copying image from closet to main, should be reused for randomization
  function copyBackground(fromId, toElement) {
    const source = document.getElementById(fromId);  // stores id of intended clothing item from closet

    const background = source.style.backgroundImage; //stores image in closet

    //sets image and properly formats it in main
    toElement.style.backgroundImage = background;
    toElement.style.backgroundSize = "cover";
    toElement.style.backgroundPosition = "center";
    toElement.style.backgroundRepeat = "no-repeat";
  }

  // to be deleted, just for demonstration 
  function setOutfit() {
    copyBackground("neutral-shirt-1", shirtSlot);
    copyBackground("neutral-pants-2", pantsSlot);
    copyBackground("neutral-shoes-3", shoesSlot);
  }

  setOutfit();

  // refresh outfit button
  const refreshButton = document.getElementById("refresh-button");
 
  // Gets a random clothing item based on type
  function getRandomItem(prefix) {
    const items = Array.from(
      document.querySelectorAll(`#closet .clothes[id*='${prefix}']`)
    );
    if (items.length === 0) return null;

    const random = items[Math.floor(Math.random() * items.length)];
    return random.id;
  }

  function refreshOutfit() {
    const shirtId = getRandomItem("shirt");
    const pantsId = getRandomItem("pants");
    const shoesId = getRandomItem("shoes");

    copyBackground(shirtId, shirtSlot);
    copyBackground(pantsId, pantsSlot);
    copyBackground(shoesId, shoesSlot);
  }

  refreshButton.addEventListener("click", refreshOutfit);

});

