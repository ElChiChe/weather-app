async function getDataFromApi(userQuery) {
    const API_KEY = "c8d02149e3454767a41151725240404";
    const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${userQuery}`;

    const response = await fetch(URL);
    const data = await response.json();   
    return data;
}


function searchWeather() {
    const input = document.querySelector("input");

    input.addEventListener("change", () => {
        let value = input.value
        getDataFromApi(value).then(data => {
            
            const time = data.location.localtime.split(" ")[1];
            const countryName = data.location.country;
            const tempCels = data.current.temp_c;
            const tempFahr = data.current.temp_f;
            const conditionText = data.current.condition.text;
            const conditionIcon = data.current.condition.icon;
            UI(countryName, time, tempCels, tempFahr, conditionText, conditionIcon);
        })
        .catch(error => {
            alert("No matching location found.", error);
        })
    })
}

function UI(countryName, time, cels, fahr, condition, icon) {
    const $timerSpan = document.querySelector(".timer-span");
    const $country = document.querySelector(".country-span");
    const $tempCels = document.querySelector(".temp-cels");
    const $tempFahr = document.querySelector(".temp-fahr");
    const $conditionText = document.querySelector(".condition");
    const $conditionIcon = document.querySelector(".condition-icon");

    $timerSpan.textContent = time;
    $country.textContent = `Country - ${countryName}`;
    $tempCels.textContent = `Temp. Celcius - ${cels}`;
    $tempFahr.textContent = `Temp. Fahrenheit - ${fahr}`;
    $conditionText.textContent = `Condition - ${condition}`;
    $conditionIcon.src = icon;
}

searchWeather()