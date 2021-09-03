let date = document.querySelector('.weather__header-date')
let currentTemperature = document.querySelector('.weather__temaperature-current')
let button = document.querySelector('.weather__button')
let input = document.querySelector('.weather__header-input')
let town = document.querySelector('.weather__main-title')
let feels = document.querySelector('.weather__feels_like')
let windSpeed = document.querySelector('.weather__wind-speed')
let img = document.querySelector('.img')
let status = document.querySelector('.weather__wind-status')
let modal = document.querySelector('.modal')
let modalButton = document.querySelector('.modal__button')

document.addEventListener("DOMContentLoaded", app)

function app(){
    getTime()
    getWeatherData('Minsk')
    button.addEventListener('click' , () => {
        getWeatherData(input.value)
        input.value = ''  
    })    
}        

function getTime(){ 
    date.innerText = new Date().toLocaleString()
    setInterval(() => {
        date.innerText = new Date().toLocaleString()
    }, 1000);
}

async function getWeatherData(city) {
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e2df985448d31c43026b448cc7259c06`)
        let data = await response.json()
        render(data)
    }
    catch{
        modal.classList.add('open')
        modalButton.addEventListener('click', () => modal.classList.remove('open'))
        getWeatherData('Minsk')
    }
}

function render(data){
    town.innerText = `${data.name}`
    currentTemperature.innerText = `Current temperature:  ${conventToCelcium(data.main.temp)}°`
    feels.innerText = `Feels like:  ${conventToCelcium(data.main.feels_like)}°`
    windSpeed.innerText = `Wind Speed: ${data.wind.speed}`
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    status.innerText = `Status: ${data.weather[0].main}`    
}

function conventToCelcium(number){
    return Math.round(number - 273,15)
}