import "./css/style.css";
import apiController from "./modules/apiController.js";
import validation from "./modules/formValidation.js";


const weatherController = apiController();
const validationCreator = validation();

const locationForm = document.querySelector("#location-form");
const locationInput = document.querySelector("#location-input");

validationCreator.createLocationValidation(locationInput);

locationForm.addEventListener("submit", (e) => {
    //prevent default submit event from reloading the page
    e.preventDefault();

    weatherController.getWeatherInfo(locationInput.value);

});

