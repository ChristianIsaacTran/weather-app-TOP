export default function apiController() {

    // takes a location as input and gets the data from weather API
    async function getWeatherInfo(location) {
        try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=CCSJSVHTKZ7Q3ZGU2EYVQ2FU5`);
        const weatherData = await response.json();
        console.log(weatherData);
        }
        catch(error) {
            alert(error);
            console.log(error);
        }
    }



    return { getWeatherInfo };
}
