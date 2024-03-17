const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector("#search-btn");
const weatherImg = document.querySelector(".weather-img");
const temp = document.querySelector(".temprature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind");
const locNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");

async function checkWeather(city){
    const apiKey="61d47cf09fe04068d22587dcb9cc7176";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const weatherData=await fetch(`${url}`).then(Response=>Response.json());
    console.log(weatherData);
    
    if(weatherData.cod==='404'){
        locNotFound.style.display="block";
        weatherBody.style.display="none";
        console.log("error hai re");
        return;
    }
    locNotFound.style.display="none";
    weatherBody.style.display="flex";
    temp.innerHTML=`${Math.round(weatherData.main.temp-273.15)}°C`;
    description.innerHTML=`${weatherData.weather[0].description}`;
    humidity.innerHTML=`${weatherData.main.humidity}%`;
    windSpeed.innerHTML=`${weatherData.wind.speed}km/h`;

    switch(weatherData.weather[0].main){
        case 'Clouds': weatherImg.src="/cloudy.png";
        break;
        case 'Clear': weatherImg.src="/sunny.png";
        break;
        case 'Rain': weatherImg.src="/rainy.png";
        break;
        case 'Mist': weatherImg.src="/windy.png";
        break;
        case 'Snow': weatherImg.src="/stormy.png";
        break;
        
    }

    // if(weatherData.weather[0].main==='Clouds'){
    //     weatherImg.src="/cloudy.png";
    // } else if(weatherData.weather[0].main==='Clear'){
    //     weatherImg.src="/sunny.png";
    // } else  if(weatherData.weather[0].main==='Rain'){
    //     weatherImg.src="/rainy.png";
    // } else  if(weatherData.weather[0].main==='Mist'){
    //     weatherImg.src="/windy.png";
    // } else  if(weatherData.weather[0].main==='Snow'){
    //     weatherImg.src="/stormy.png";
    // } 
}
searchBtn.addEventListener("click",()=>{
      checkWeather(inputBox.value);
    });
