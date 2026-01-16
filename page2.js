
const apiKey = "f75ca538204eb8d9a9080b368723599e";


const submitBtn = document.getElementById("submit");
let citySearch = document.getElementById("search");
let cards = document.getElementById("card-container")

submitBtn.addEventListener("click", function () {
    const city = citySearch.value.trim();

    if (city === "") {
        alert("please enter a city")
        return;
    }

    createWeatherCard(city);

    citySearch.value = "";
})

async function createWeatherCard(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        if (response.ok==false) {
            alert("city not found")
            return;
        }
        const data = await response.json();
        const card = document.createElement("div");
        card.className = "card";

        const cityName = document.createElement("h3");
        cityName.className = "city-name";
        cityName.innerText = data.name;


        const temp = document.createElement("h4");
        const tempC = (data.main.temp - 273.15).toFixed();
        temp.textContent = `${tempC} °C`;

        const condition = document.createElement("p");
        condition.innerText = data.weather[0].main;

        const humidity = document.createElement("p");
        humidity.innerText = `Humidity: ${data.main.humidity}%`;

        const wind = document.createElement("p");
        const ws = data.wind.speed
        wind.innerText = `wind speed - ${ws}m/s`

        const icon = document.createElement("img");
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        const del = document.createElement("button");
        del.classList = "del-btn"
        del.innerText = "Delete";

        del.addEventListener("click",function(){
            card.remove();
        });

        card.appendChild(cityName);
        card.appendChild(icon);
        card.appendChild(temp);
        card.appendChild(condition);
        card.appendChild(humidity);
        card.appendChild(wind);
        card.appendChild(del);

        cards.appendChild(card);
    }

    catch (error) {
        alert("Something went wrong");
    }


}






