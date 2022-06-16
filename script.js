const search = document.getElementById("search");
const clear = document.getElementById("clear");
const cityInput = document.querySelector("input");
const container = document.querySelector(".container");

const getWeatherInfo = async () => {
    if (container.innerHTML.toLowerCase().includes(cityInput.value.toLowerCase())) {
        alert(cityInput.value + " is already exists")
    }
    else {
        const key = "b75138e87a3370f1e5a18a08eeb235c3";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&APPID=${key}`
    
        try{
            const response = await fetch(url);
            const weatherInfo = await response.json();
            // console.log(weatherInfo);
            const {weather, main, name, sys} = weatherInfo;
            // console.log(weather, main, name);
            container.innerHTML += `<li><p> ${name} <sup id="sup">${sys.country}</sup></p> <span>${main.temp.toFixed(0)} <sup id="degree">°C</sup></span> <br> <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png"> <br> <span id="info">${(weather[0].description).toUpperCase()}</span></li>`
        }
        catch(error){
            alert("There is not a city called " + cityInput.value);
        }
        finally{
            cityInput.value = "";
        }
    }
}

search.addEventListener("click", getWeatherInfo);
window.onload = function refresh () {
    cityInput.focus()
}

cityInput.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        getWeatherInfo();
    }
})

clear.addEventListener("click", () => {
    container.innerHTML = "";
})

clear.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
        container.innerHTML = "";
    }
})
