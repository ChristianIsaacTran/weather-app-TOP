import "./css/style.css";
import apiController from "./modules/apiController.js";
import validation from "./modules/formValidation.js";
import weatherRender from "./modules/weatherRender.js";

const weatherController = apiController();
const validationCreator = validation();
const render = weatherRender();

const locationForm = document.querySelector("#location-form");
const locationInput = document.querySelector("#location-input");

// on page startup, by default render a default location
render.defaultRender(weatherController.getWeatherInfo("Denton, Texas"));

validationCreator.createLocationValidation(locationInput);

locationForm.addEventListener("submit", (e) => {
    //prevent default submit event from reloading the page
    e.preventDefault();
    render.clearRender();
    render.defaultRender(weatherController.getWeatherInfo(locationInput.value));
    
    // reset search bar value after submission
    locationInput.value = "";
});
