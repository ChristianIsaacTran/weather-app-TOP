export default function weatherRender() {
    // html helper function to create new html elements
    function createHTMLElement(element, classAttribute = "") {
        const newCreatedElement = document.createElement(element);
        newCreatedElement.className = classAttribute;

        return newCreatedElement;
    }

    // uses icon string to detect what icon to use for weather
    async function checkWeatherIcon(iconValue) {
        try {
            // convert string to lowercase to prevent comparison errors
            const lowerIconVal = iconValue.toLowerCase();

            const cloudyCond = [
                "cloudy",
                "partly-cloudy-day",
                "partly-cloudy-night",
            ];

            const clearCond = ["clear-day", "clear-night"];

            const windCond = "wind";

            const fogCond = "fog";

            const rainCond = ["rain", "showers-day", "showers-night"];

            const thunderCond = [
                "thunder-rain",
                "thunder-showers-day",
                "thunder-showers-night",
            ];

            const freezingCond = [
                "snow",
                "snow-showers-day",
                "snow-showers-night",
            ];

            // check each condition, if it exists/includes it, then dynamic import image
            // this is the ending condition of the weather icon
            let endCondition = "";
            let endIcon = "";

            cloudyCond.forEach((cond) => {
                if (cond.includes(lowerIconVal)) {
                    endCondition = "cloudy";
                    endIcon = "☁";
                }
            });

            clearCond.forEach((cond) => {
                if (cond.includes(lowerIconVal)) {
                    endCondition = "clear";
                    endIcon = "🌤";
                }
            });

            if (windCond.includes(lowerIconVal)) {
                endCondition = "windy";
                endIcon = "🌪 ";
            }

            if (fogCond.includes(lowerIconVal)) {
                endCondition = "fog";
                endIcon = "🌫";
            }

            rainCond.forEach((cond) => {
                if (cond.includes(lowerIconVal)) {
                    endCondition = "rain";
                    endIcon = "🌧";
                }
            });

            thunderCond.forEach((cond) => {
                if (cond.includes(lowerIconVal)) {
                    endCondition = "thunder";
                    endIcon = "🌩";
                }
            });

            freezingCond.forEach((cond) => {
                if (cond.includes(lowerIconVal)) {
                    endCondition = "freeze";
                    endIcon = "🌨";
                }
            });

            // return the imported image filepath to be used in render

            const pictureFilePath = await import(
                `../images/${endCondition}.png`
            );

            return { icon: endIcon, picture: pictureFilePath };
        } catch (error) {
            console.log(error);
        }
    }

    // helper function to clear the current render
    function clearRender() {
        const elementList = document.querySelectorAll("#content-container > *");
        elementList.forEach((element) => {
            element.remove();
        });
    }

    // note: anything using asynchronous anything needs to STAY asyncrhonous
    // this renders a default page to the webpage based on the API data
    async function defaultRender(weatherData) {
        try {
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

            // generate HTML elements
            const contentContainer =
                document.querySelector("#content-container");
            const currentTitle = createHTMLElement("h1", "current-title");
            const topContentContainer = createHTMLElement(
                "div",
                "top-content-container",
            );
            const locationHeader = createHTMLElement("h1", "location-header");
            const currentCard = createHTMLElement("div", "current-card");
            const weatherTemp = createHTMLElement("h1", "weather-temp");
            const weatherIcon = createHTMLElement("p", "weather-icon");
            const weatherDes = createHTMLElement("h3", "weather-descrip");
            const weatherDesBG = createHTMLElement("div", "descrip-BG");
            const dayTitle = createHTMLElement("h1", "day-title");
            const dayGroup = createHTMLElement("ul", "day-group");

            // dynamically generate day HTML objects based on the next 6 days
            const dayCutoff = 7;
            const increment = 1;
            for (let i = 1; i < dayCutoff; i += increment) {
                const iconObj = await checkWeatherIcon(
                    processedData.days[i].icon,
                );

                const day = createHTMLElement("li", "day");
                const dayTemp = createHTMLElement("h1", "day-temp");
                const dayIcon = createHTMLElement("p", "day-icon");

                dayTemp.textContent = processedData.days[i].temp;
                dayIcon.textContent = iconObj.icon;

                day.appendChild(dayTemp);
                day.appendChild(dayIcon);

                dayGroup.appendChild(day);
            }

            // add values and attributes to HTML elements
            currentTitle.textContent = "CURRENT WEATHER";
            locationHeader.textContent = processedData.resolvedAddress;
            weatherTemp.textContent = processedData.currentTemp + "°";

            const iconObj = await checkWeatherIcon(processedData.currentIcon);
            weatherIcon.textContent = iconObj.icon;
            topContentContainer.style.backgroundImage = `url(${iconObj.picture.default})`;
            weatherDes.textContent = processedData.description;
            dayTitle.textContent = "DAILY FORECAST";

            // assemble HTML elements
            currentCard.appendChild(locationHeader);
            currentCard.appendChild(weatherTemp);
            currentCard.appendChild(weatherIcon);
            weatherDesBG.appendChild(weatherDes);
            topContentContainer.appendChild(currentCard);
            topContentContainer.appendChild(weatherDesBG);
            contentContainer.appendChild(currentTitle);
            contentContainer.appendChild(topContentContainer);
            contentContainer.appendChild(dayTitle);
            contentContainer.appendChild(dayGroup);
        } catch (error) {
            console.log(error);
        }
    }

    return { defaultRender, clearRender };
}
