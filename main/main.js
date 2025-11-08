
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
});