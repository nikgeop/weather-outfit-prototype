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

