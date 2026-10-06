const element = document.getElementById("scramble-text");

const target = 'const codebase = "restructured";';
const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";

function scrambleText() {
    let iteration = 0;

    const interval = setInterval(() => {
        element.textContent = target
            .split("")
            .map((char, index) => {
                if (char === " ") {
                    return " ";
                }

                if (index < iteration) {
                    return target[index];
                }

                return characters[
                    Math.floor(Math.random() * characters.length)
                ];
            })
            .join("");

        iteration += 0.5;

        if (iteration >= target.length) {
            clearInterval(interval);
            element.textContent = target;
        }
    }, 40);
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                scrambleText();
            }
        });
    },
    {
        threshold: 0.5
    }
);

observer.observe(element);

function scrambleClearInput(input) {
    const text = input.value;
    let iteration = 0;

    const interval = setInterval(() => {
        input.value = text
            .split("")
            .map((char, index) => {
                if (index >= text.length - iteration) {
                    return "";
                }

                return characters[
                    Math.floor(Math.random() * characters.length)
                ];
            })
            .join("");

        iteration += 0.5;

        if (iteration >= text.length) {
            clearInterval(interval);
            input.value = "";
        }
    }, 40);
}


let getWeather = async(weather_location) =>{
    try{

        const response = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(weather_location)}`);
        
        if(!response.ok){
            throw new Error("Error occurred while fetching data!");
            
        }

        const data = await response.json();

        return data;

    }catch(error){
        console.log(error);
        return undefined;
    }

}

let searchWeather = async(weather_location) =>{
    const weatherData = await getWeather(weather_location);





    if(!weatherData || weatherData.error){
        alert("Something went wrong");
        return
    }

    let humidityEl = document.getElementById("humidity-percentage");
    let windSpeedEl = document.getElementById("wind-speed");;
    let weatherTempEl = document.getElementById("weather_temp");
    let weatherLocationEl = document.getElementById("weather_location");

    let humidity = weatherData?.main?.humidity;
    let windSpeed = (weatherData?.wind?.speed * 3.6) + " km/h";
    let weatherTemp = Math.round(weatherData?.main?.temp) + "°C";
    let weatherLocation = weatherData?.name;

    humidityEl.textContent = humidity ??"N/A";
    windSpeedEl.textContent = windSpeed ?? "N/A";
    weatherTempEl.textContent = weatherTemp ?? "N/A";
    weatherLocationEl.textContent = weatherLocation ?? "N/A";


}

const searchBox = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click",() =>{
    const searchValue = searchBox.value.trim();
    if(searchValue !== ""){
        searchWeather(searchValue);
        scrambleClearInput(searchBox);
    }
})
