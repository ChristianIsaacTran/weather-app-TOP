export default function apiController() {
    // takes a location as input and gets the data from weather API
    async function getWeatherInfo(location) {
        try {
            const response = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=CCSJSVHTKZ7Q3ZGU2EYVQ2FU5`,
            );
            const weatherData = await response.json();
            const processedData = processWeather(weatherData);
            return processedData;
        } catch (error) {
            alert(error);
            console.log(error); 
        }
    }

    // extract needed data from .json() and return the processed data object
    function processWeather(weatherData) {
        const processedData = {
            resolvedAddress: weatherData.resolvedAddress,
            alerts: weatherData.alerts,
            days: weatherData.days,
            description: weatherData.description,
            currentCondition: weatherData.currentConditions.conditions,
            currentTemp: weatherData.currentConditions.temp,
            currentFeelLike: weatherData.currentConditions.feelslike
        } 
        
        return processedData;
    }

    return { getWeatherInfo };
}
