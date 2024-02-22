const APIKey = '4013a28adb1813572948e604b2320fd7';
const myForm = document.getElementById('myForm');
const myInput = document.getElementById('myInput');
const loc = document.getElementById('location');
const temp = document.getElementById('temp');
const feelslike = document.getElementById('feelsLike');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const container = document.getElementById('container');
navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position);
    if(position){
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;
        fetch(url).then(response => response.json()).then(data =>{
            renderWeatherData(data);
            container.classList.add('swap');
            container.style.animation = 'swap 4s ease forwards';
        });

    }

});

myForm.addEventListener('submit', function(event){
    event.preventDefault();
    //const APIKey = '4013a28adb1813572948e604b2320fd7';
    const city = document.getElementById('myInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
    
    const weatherData = fetch(`${url}`).then(response => response.json())
    .then(weatherData =>{
        
        renderWeatherData(weatherData);
        container.classList.add('swap');
        container.style.animation = 'swap 4s ease forwards';
    });
    
});

function renderWeatherData (weatherData){
 
        const temperature = Math.round(weatherData.main.temp);
        const feelTemp = Math.round(weatherData.main.feels_like);
        const humid = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed.toFixed(1);
        const weatherDescription = weatherData.weather[0].description;
        const lucation = weatherData.name;
        
        temp.textContent = `${temperature}`;
        feelslike.textContent = `Feels like: ${feelTemp}°C`;
        description.textContent = `${weatherDescription}`;
        humidity.textContent = `${humid}%`;
        wind.textContent = `${windSpeed}m/s`;
        loc.textContent = lucation;

        
}

