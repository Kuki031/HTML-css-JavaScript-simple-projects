//Rest countries API https://restcountries.com/v2/name/${country}
//Leaflet map library https://leafletjs.com/
//Open meteo API https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m
"use strict"

const insertCountryDiv = document.querySelector('.inject-country');
const weatherDiv = document.querySelector('.weather');
const spansAll = Array.from(document.querySelectorAll('.span'));
const spansWeatherAll = Array.from(document.querySelectorAll('.span2'));
const parasRenderCountry = Array.from(document.querySelectorAll('.p'));
const btnsAll = Array.from(document.querySelectorAll('.btn'));
const form = document.querySelector('#form').addEventListener('submit' , (e) => e.preventDefault());
let inputLat = document.querySelector('#input-lat');
let longRnd;
let latiRnd;

const generateError = function (errMessage, mainMsg = 'Something went wrong!') {
       alert(`${mainMsg} ${errMessage}`)
};


const generateCountry = function (data) {
        parasRenderCountry.forEach(paragraph => {
        const countryName = document.querySelector('.inject-country h2').innerHTML = `${data.name}`;
        const imageFlag = document.querySelector('.img');
              imageFlag.src = `${data.flag}`
        switch(paragraph.id) {
            case "cap" :
                paragraph.innerHTML = `🏙Capital: ${data.capital}`
                break;
            case "currency" :
                paragraph.innerHTML = `💲Currency: ${data.currencies[0].code}`
                break;
            case "language" :
                paragraph.innerHTML = `👋🏻Language: ${data.languages[0].name}`
                break;
            case "region"   :
                paragraph.innerHTML = `🌄Region: ${data.region}`
                break;
            case "population" :
                paragraph.innerHTML = `🧍Population: ${data.population}`
                break;

                default : undefined;
            }   
            })
            insertCountryDiv.style.display = 'flex';
            weatherDiv.style.display = 'flex';  
}


const searchByCountry = async function (country) {
    try {

        //Rest countries API
        if(inputLat.value === '') throw new Error('Input Empty!');
        const getCountry = await fetch(`https://restcountries.com/v2/name/${country}`);
        if(!getCountry.ok) throw new Error('Country does not exist!');
        const getData = await getCountry.json();
        const capitalCity = getData[0].capital;
        const latitude = getData[0].latlng[0];
        const longitude = getData[0].latlng[1];
        generateCountry(getData[0]);       
        getWeather(capitalCity,longitude,latitude);
        inputLat.value = '';

        }
        catch(err) {
            alert(generateError(err.message));
        }
}



const targetFunc = function (e) {
    let mainEl = e.target;
    switch(mainEl.id) {
        case "submit" :
            searchByCountry(inputLat.value);
        break;

        case "generate-your" :
            navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const long = pos.coords.longitude;
            const map = L.map('map').setView([lat, long], 13);
            //Leaflet map library
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([lat, long]).addTo(map)
            getYourLocation(lat,long);
            },() => {
            alert('Permission denied for your location.')
            })

        break;

        default : undefined;
    }
}


const getYourLocation = function(lat,long) {
        spansAll.forEach(span => {
        switch(span.id) {
            case "lng-your" :
                span.textContent = `${(long).toFixed(5)}`;
                break;
            case "lat-your" :
                span.textContent = `${(lat).toFixed(5)}`;
                break;

                default : undefined;
            }
        })
    }


btnsAll.forEach(button => button.addEventListener('click' , targetFunc));


const getWeather = async function(capital,long,lati) {
    try{

    //Open meteo API
    const fetchData = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`);
    if(!fetchData.ok) throw new Error('Error getting weather data.');
    const getData = await fetchData.json();
    spansWeatherAll.forEach(span => {
        switch(span.id) {
            case "capital-city":
                span.innerHTML = `${capital}`
                break;
            case "wind-speed"  :
                span.innerHTML = `${getData.current_weather.windspeed} km/h`
                break;
            case "wind-der"    :
                span.innerHTML = `${getData.current_weather.winddirection} °`
                break;
            case "temp"        :
                span.innerHTML = `${getData.current_weather.temperature} °C`
                break;
            default : undefined;
            }
            })

            }

            catch(err) {
                alert(generateError(err.message));
            }
}
