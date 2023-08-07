// Day & Month Name ----------------------------
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let date = new Date
let monthIndex = date.getMonth()
let dayIndex = date.getDay()

// --------------------------------------------
let today = document.querySelector(".today")
let current = document.getElementById("current")


let day2 = document.getElementById("day2")
let day3 = document.getElementById("day3")

let nextDayForecast = document.getElementById("nextDayForecast")
let thirdDayForecast = document.getElementById("thirdDayForecast")

let forecastIcon2 = document.getElementById("forecastIcon2")
let forecastIcon3 = document.getElementById("forecastIcon3")

let forecastDegree2 = document.getElementById("forecastDegree2")
let forecastDegree3 = document.getElementById("forecastDegree3")

let smallTemp2 = document.getElementById("smallTemp2")
let smallTemp3 = document.getElementById("smallTemp3")

let custom2 = document.getElementById("custom2")
let custom3 = document.getElementById("custom3")

let countryName 
let currentTemp 
let forecastList = []

async function getWeather(country) {
    let myReq = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9e9a0a1b6f3a4df59c7200752230408&q=${country} &days=3`)
    let data = await myReq.json()
    countryName = data.location
    currentTemp = data.current
    forecastList = data.forecast.forecastday
    displayToday()
    displayCurrent()
    displayAnother()
  }

  // getWeather("cairo")

  // Geolocation---------------------------------------
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
  
      (position) => {
  
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        let locaition = `${lat},${lon}`
        getWeather(locaition)
  
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  } else {console.error("Geolocation is not supported by this browser.");
  }

  // Function for Today date ----------------------------------------------
function displayToday() {
  let date = new Date(forecastList[0].date)
  let dayIndex = date.getDay()
  let monthIndex = date.getMonth()
    temp = `<div class="day">${days[dayIndex]}</div>
    <div class="date">${ date.getDate() + monthNames[monthIndex]}</div>`
    today.innerHTML = temp
}

  // Function for Today forecast ----------------------------------------
function displayCurrent() {
    temp = `<div class="location">${countryName.name}</div>
    <div class="degree d-flex align-items-center">
      <div class="num text-white fw-bold">${currentTemp.temp_c}<sup>o</sup>C</div>
      <div class="forecast-icon ">
          <img src="${currentTemp.condition.icon}" alt="" width="90">
      </div>	
    </div>
    <div class="custom">${currentTemp.condition.text}</div>
    <span class="pt-2"><img src="images/icon-umberella.png" alt="" class="pe-1"> ${forecastList[0].day.daily_chance_of_rain} %</span>
    <span><img src="images/icon-wind.png" alt="" class="pe-1"> ${currentTemp.wind_kph} km/h</span>
    <span><img src="images/icon-compass.png" alt="" class="pe-1"> ${currentTemp.wind_dir}</span>`
    current.innerHTML = temp
}
  // Function for another Two days --------------------------------------------
function displayAnother() {
  for(let i = 0 ; i< forecastList.length ; i++) {
    let date = new Date(forecastList[i].date)
    console.log(days[date.getDay()])

    if(i == 1) {
      day2.innerHTML = days[date.getDay()]
      forecastIcon2.src = forecastList[1].day.condition.icon
      forecastDegree2.innerHTML = forecastList[1].day.maxtemp_c + `<sup>o</sup>C`
      smallTemp2.innerHTML = forecastList[1].day.mintemp_c + `<sup>o</sup>`
      custom2.innerHTML = forecastList[1].day.condition.text
    }
    if( i == 2) {
      day3.innerHTML = days[date.getDay()]
      forecastIcon3.src = forecastList[2].day.condition.icon
      forecastDegree3.innerHTML = forecastList[2].day.maxtemp_c + `<sup>o</sup>C`
      smallTemp3.innerHTML = forecastList[2].day.mintemp_c + `<sup>o</sup>`
      custom3.innerHTML = forecastList[2].day.condition.text
    }
}
}
// Search------------------------------------------------
document.getElementById("search").addEventListener("keyup", event=>{
    getWeather(event.target.value)
});





