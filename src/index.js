import "./css/style.css";
import apiController from "./modules/apiController.js";


const weatherController = apiController();


weatherController.getWeatherInfo("Denton, Texas");
