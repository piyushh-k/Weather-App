

const weatherAPI = "https://api.open-meteo.com/v1/forecast?latitude="
const geoCodeAPI = "https://api.opencagedata.com/geocode/v1/json?q="



const temp = document.querySelector(".Temp");
const name = document.querySelector(".name");
const load = document.querySelector(".load");
const loader = document.querySelector(".loader")
const humidity = document.querySelector("#humidity")
const clouds = document.querySelector("#clouds")
const wind = document.querySelector("#wind")
const wIcon = document.querySelector(".weather-icon")

async function nav(city , country){
    const nav = await fetch(geoCodeAPI + `${city}` + `%2C` + `${country}` + `&key=1e79da29e90c4f1ba650720ff8bd61d4`)
    const loc = await nav.json();
    
    const lat = loc.results[0].geometry.lat;
    const long = loc.results[0].geometry.lng;
    return {lat , long};
}


async function print(lat,long , city , country) {
    load.style.display = "inline";
    loader.style.display = "inline-block"
    const response = await fetch(weatherAPI + `${lat}` + `&longitude=` + `${long}` + `&hourly=temperature_2m,relative_humidity_2m,cloud_cover,wind_speed_10m,snowfall`);
    const data = await response.json();

    setTimeout(() => {
       let tempFound = data.hourly.temperature_2m[0]+ `°C` + `\n`+ `${city}` + `\n`+ `${country}`;
        function animation(){
            let initTemp = 0;
        const timer = setInterval(() => {
            initTemp++;
            temp.innerText = `${initTemp}°C ` 
            if(initTemp >= data.hourly.temperature_2m[0]){
                clearInterval(timer);
            }
        }, 80);
        }
        animation();
        temp.style.fontfamily = 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans';
        humidity.innerHTML =  `<i class="fa-solid fa-water"></i> Humidity` + `<br>` + data.hourly.relative_humidity_2m[0] + `%`;

        clouds.innerHTML = `<i class="fa-solid fa-cloud"></i> Clouds` + `<br>` + data.hourly.cloud_cover[0] + `%`;
        wind.innerHTML = `<i class="fa-solid fa-wind"></i> Winds` + `<br>` + data.hourly.wind_speed_10m[0] + `km/h`;

        load.style.display = "none";
        loader.style.display = "none";
    }, 1500);
}

const input = document.querySelector("#input");
const body = document.documentElement.querySelector("body");

input.addEventListener("mouseover", () => {
    input.style.width = "400px"
    input.style.height = "70px"
});

input.addEventListener("mouseout", () => {
    input.style.width = "200px"; 
    input.style.height = "49px"
  });

async function Country(){
    const inputValue = document.querySelector("#input").value;
    if(inputValue.includes(",")){
        const [city , country] = inputValue.split(","); 
        const {lat , long} = await nav(city.trim(), country.trim());
        await print(lat, long , city , country);
    }
    else {
        alert("Please provide in the input in the following format : city, country (e.g., Delhi, India)");
    }
}


