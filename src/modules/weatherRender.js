export default function weatherRender() {
    // html helper function to create new html elements
    function createHTMLElement(element, classAttribute = "") {
        const newCreatedElement = document.createElement(element);
        newCreatedElement.className = classAttribute;

        return newCreatedElement;
    }

    // renders the given weather data visually
    // also use giphy API if possible
    function renderWeather(weatherData) {
        console.log("This is inside the weather render"+weatherData);
    }

    // note: anything using asynchronous anything needs to STAY asyncrhonous 
    // this renders a default page to the webpage based on the API data
    async function defaultRender(weatherData) {
        // wait for data from API to arrive and processed before using it
        const processedData = await weatherData; 
        console.log(processedData);

        /*
        use processed data from API to display:

        1. today's current weather conditions and temperature
        
        2. the entire week temperatures with pictures to describe weather

        3. location and date of the chosen area

        4. Any weather emergency alerts. If none, then omit visual
        */

        
        

        
    }

    
    


    return { renderWeather, defaultRender };
}
