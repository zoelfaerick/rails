const SelectedTempUnit = localStorage.getItem('SelectedTempUnit');
const SelectedWindUnit = localStorage.getItem('SelectedWindUnit');
const SelectedVisibiltyUnit = localStorage.getItem('selectedVisibilityUnit');



let currentLocation = null;

document.addEventListener('DOMContentLoaded', () => {
    showLoader();
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            currentLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            getWeatherByCoordinates(currentLocation.latitude, currentLocation.longitude);
        }, (error) => {
            console.error('Geolocation error:', error);

        });
    } else {
        console.error('Geolocation is not available in this browser.');

    }
});


const Uv_0 = 'A UV index is satisfactory, indicating that there is little or no risk of harm from ultraviolet radiation.';
const Uv_1 = 'Conditions are generally low-risk, indicating that exposure to ultraviolet radiation poses a minimal threat.';
const Uv_2 = 'Low exposure level with minimal risk of harm from UV radiation, suitable for most people.';
const Uv_3 = 'Moderate risk of harm from unprotected sun exposure, protective measures recommended.';
const Uv_4 = 'Moderate risk of harm from unprotected sun exposure, protective measures recommended.';
const Uv_5 = 'Moderate risk of harm from unprotected sun exposure, protective measures recommended.';
const Uv_6 = 'High risk of harm from unprotected sun exposure, protective measures required.';
const Uv_7 = 'High risk of harm from unprotected sun exposure, protective measures required.';
const Uv_8 = 'Very high risk of harm from unprotected sun exposure, extra precautions required.';
const Uv_9 = 'Very high risk of harm from unprotected sun exposure, extra precautions required.';
const Uv_10 = 'Very high risk of harm from unprotected sun exposure, extra precautions required.';
const Uv_11 = 'Extreme risk of harm from unprotected sun exposure, full protection necessary.';
const Uv_12 = 'Extreme risk of harm from unprotected sun exposure, full protection necessary.';
const Uv_13 = 'Extreme risk of harm from unprotected sun exposure, full protection necessary.';

function handleGeolocationError(error) {
    console.error('Error getting geolocation:', error);
    displayErrorMessage('Error getting geolocation. Please enable location services.');
}


document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const cityList = document.getElementById('city-list');
    const cityopen = document.getElementById('city-open');
    const searchContainer = document.getElementById('search-container');
    const closeButton = document.querySelector('.close_search');


    cityopen.addEventListener("click", () => {
        searchContainer.style.display = 'block';
        window.history.pushState({ SearchContainerOpen: true }, "");

        setTimeout(() =>{
            cityInput.focus()
        }, 300);
    });

    closeButton.addEventListener('click', () => {

        window.history.back()
    });




    cityInput.addEventListener('input', () => {
        const searchTerm = cityInput.value.trim();
        document.querySelector('.currentLocationdiv').hidden = true;


        if (searchTerm) {
            document.getElementById('cityLoader').hidden = false;
            fetchCitySuggestions(searchTerm)
                .then(suggestions => displayCitySuggestions(suggestions, searchTerm));
        } else {
            cityList.innerHTML = '';
            document.getElementById('cityLoader').hidden = true;
            document.querySelector('.currentLocationdiv').hidden = false;


        }
    });


    cityInput.addEventListener('keypress', (event)=>{
        const searchTerm = cityInput.value.trim();
        document.querySelector('.currentLocationdiv').hidden = true;

        if(event.key === 'Enter'){
            if(searchTerm){
                document.getElementById('cityLoader').hidden = false;
                fetchCitySuggestions(searchTerm)
                    .then(suggestions => displayCitySuggestions(suggestions, searchTerm));
            }else {
                cityList.innerHTML = '';
                document.getElementById('cityLoader').hidden = true;
                document.querySelector('.currentLocationdiv').hidden = false;


            }
        }
    });

    cityList.addEventListener('click', (event) => {
        const selectedCity = event.target.textContent;
        const apiKey = '120d979ba5b2d0780f51872890f5ad0b';

        

        window.history.back()




        cityList.innerHTML = '';
        cityInput.value = '';
        document.getElementById('city-name').innerHTML = '<md-circular-progress indeterminate style="--md-circular-progress-size: 30px;"></md-circular-progress>'
        document.querySelector('.focus-input').blur();
        document.getElementById('forecast').scrollLeft = 0;
        document.getElementById('weather_wrap').scrollTop = 0;
        setTimeout(() =>{
            cityInput.dispatchEvent(new Event('input'));
        }, 200);

        showLoader()
        if (selectedCity.toLowerCase() === "delhi, india") {
            getWeather(selectedCity, 28.6139, 77.2090);
        } else {
            fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(selectedCity)}&limit=1&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        const cityCoords = data[0];
                        getWeather(selectedCity, cityCoords.lat, cityCoords.lon);
                    }
                })
                .catch(error => console.error('Error fetching coordinates:', error));
        }

    });
});


window.addEventListener('popstate', function (event) {
    document.getElementById('search-container').style.opacity = '0'

    setTimeout(() => {
        document.getElementById('city-input').value = ''
        document.getElementById('city-input').dispatchEvent(new Event('input'));
        document.getElementById('search-container').style.display = 'none'
        document.getElementById('search-container').style.opacity = '1'

    }, 200);

});


function fetchCitySuggestions(searchTerm) {
    const query = encodeURIComponent(searchTerm);
    const apiKey = '120d979ba5b2d0780f51872890f5ad0b';

    if (searchTerm.toLowerCase() === "delhi") {
        return Promise.resolve(["Delhi, India"]);
    }

    return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => data.map(city => {
            const cityName = city.name;
            const stateOrCountry = city.state || city.country;

            return `${cityName}, ${stateOrCountry}`;

        }))
        .catch(error => console.error('Error fetching city suggestions:', error));
}

function displayCitySuggestions(suggestions, searchTerm) {
    const cityList = document.getElementById('city-list');
    cityList.innerHTML = '';
    suggestions.forEach(suggestion => {

        if (suggestion.toLowerCase().includes(searchTerm.toLowerCase())) {
            const suggestionItem = document.createElement('div');
            const saveBTN = document.createElement('md-text-button');
                        const createSuggestRipple = document.createElement('md-ripple')
                        createSuggestRipple.style = '--md-ripple-pressed-opacity: 0.13;'
            // const suggestSpace = document.createElement('suggest-space');
            suggestionItem.classList.add("suggest");
            suggestionItem.textContent = suggestion;
            // suggestionItem.appendChild(suggestSpace)
            cityList.appendChild(suggestionItem);
            // suggestionItem.appendChild(saveBTN)
            // saveBTN.textContent = 'Save'
            suggestionItem.appendChild(createSuggestRipple)

            setTimeout(() => {
                document.getElementById('cityLoader').hidden = true;

            }, 400);

        }
    });
}



function getWeather(city, latitude, longitude) {
    showLoader();
    const apiKey = '120d979ba5b2d0780f51872890f5ad0b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    setTimeout(() => {
        updateMoonTrackProgress(latitude, longitude)
        updateSunTrackProgress(latitude, longitude);
    }, 500);



    function SendupdateSunTrackProgress(){
        updateSunTrackProgress(latitude, longitude);
    }

    function SendupdateMoonTrackProgress(){
        updateMoonTrackProgress(latitude, longitude)
    }

    setInterval(SendupdateSunTrackProgress, 60000);
    setInterval(SendupdateMoonTrackProgress, 60000);


    
    localStorage.setItem('currentLong', longitude)
    localStorage.setItem('currentLat', latitude)


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const cityName = data.name;
            const countryName = data.sys.country;
            const temperature = Math.round(data.main.temp);
            const tempF = Math.round(temperature * 9 / 5 + 32);
            const visibility = data.visibility;
            const visibilityInMiles = (visibility * 0.000621371).toFixed(0);

            const humidity = data.main.humidity;
            const description = data.weather[0].description;
            const clouds = data.clouds.all
            const feelslike = data.main.feels_like;
            const feelslikeF = Math.round(feelslike * 9 / 5 + 32);

                        const windDirection = data.wind.deg;

                        setTimeout(() => {
                            document.querySelector('.direction').style.transform = `rotate(${windDirection}deg)`
                        }, 300);

                        const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
                        const index = Math.round((windDirection % 360) / 45);
                        document.getElementById('directionWind').textContent = directions[index]

            const iconCode = data.weather[0].icon;
            document.getElementById('city-name').innerHTML = `${cityName}, ${countryName}`;

            if(SelectedTempUnit === 'fahrenheit'){
                document.getElementById('temp').innerHTML = `${tempF}<span>°F</span>`;
         document.getElementById('temPDiscCurrentLocation').innerHTML = `${tempF}°F • <span>${description}</span>`
             document.getElementById('willFeelLike').innerHTML = ` ${Math.round(feelslikeF + 3)}°F`

            } else{
            document.getElementById('temp').innerHTML = `${temperature}<span>°C</span>`;
             document.getElementById('temPDiscCurrentLocation').innerHTML = `${temperature}°C • <span>${description}</span>`

                 document.getElementById('willFeelLike').innerHTML = ` ${Math.round(feelslike + 3)}°C`

            }

                        if(temperature > 32){
                            document.querySelector('.excessiveHeat').hidden = false;
                        } else{
                            document.querySelector('.excessiveHeat').hidden = true;
                        }

                        if (data.rain && data.rain['1h']) {
                            const precipitation = data.rain['1h'];
                            if (precipitation > 0) {
                                document.getElementById('AmountRainMM').innerHTML = `${data.rain['1h'].toFixed(1)} mm`
                                document.querySelector('noRain').hidden = true;

                            }
                        } else {
                            document.querySelector('noRain').hidden = false;
                            document.getElementById('AmountRainMM').innerHTML = `0.0 mm`
                        }

          document.getElementById('currentLocationName').textContent = `${cityName}, ${countryName}`;
             document.getElementById('currentSearchImg').src = `weather-icons/${iconCode}.svg`;

            document.getElementById('description').textContent = description;


            const weatherIcon = document.getElementById('weather-icon');
            weatherIcon.src = `weather-icons/${iconCode}.svg`;
                        document.getElementById('froggie_imgs').src = `froggie/${iconCode}.png`;
                        document.documentElement.setAttribute('iconCodeTheme', `${iconCode}`);
                        localStorage.setItem('weatherTHEME', iconCode)
                        sendThemeToAndroid(iconCode)

            weatherIcon.alt = "Weather Icon";

            const latitude = data.coord.lat;
            const longitude = data.coord.lon;

            get24HourForecast(latitude, longitude);

            get5DayForecast(latitude, longitude);

            const windSpeedMPS = data.wind.speed;
            const windSpeedMPH = (windSpeedMPS * 2.23694).toFixed(0);

            const windSpeedKPH = (windSpeedMPS * 3.6).toFixed(0); 
            const timeZoneOffsetSeconds = data.timezone;
            const sunriseUTC = new Date((data.sys.sunrise + timeZoneOffsetSeconds) * 1000);
            const sunsetUTC = new Date((data.sys.sunset + timeZoneOffsetSeconds) * 1000);
            const maxTemp = data.main.temp_max;
            const minTemp = data.main.temp_min;

            const options = { timeZone: 'UTC', hour: 'numeric', minute: 'numeric' };
            const sunrise = sunriseUTC.toLocaleTimeString('en-US', options);
            const sunset = sunsetUTC.toLocaleTimeString('en-US', options);

            if(SelectedWindUnit === 'mile'){
                document.getElementById('wind-speed').textContent = `${windSpeedMPH} mph`;
            } else{
                document.getElementById('wind-speed').textContent = `${windSpeedKPH} km/h`;

            }


            if(SelectedVisibiltyUnit === 'mileV'){
                document.getElementById('min-temp').innerHTML = `${visibilityInMiles} mile`;
            } else{
                document.getElementById('min-temp').innerHTML = `${(visibility / 1000).toFixed(0)} km`;

            }

                        let visibilityInKm = visibility / 1000;
                        let maxVisibility = 15;

                        let visibilityPercentage = Math.min(visibilityInKm / maxVisibility, 1);

                        document.querySelector('.md-circle01').setAttribute('value', visibilityPercentage.toString());


            document.getElementById('sunrise').textContent = sunrise;
            document.getElementById('sunset').textContent = sunset;
            document.getElementById('humidity').textContent = `${humidity}%`;
            document.getElementById('clouds').textContent = `${clouds}%`;
            document.querySelector('humidityBarProgress').style.height = `${humidity}%`;


            const lastUpdatedTimestamp = data.dt;
            const lastUpdatedTime = new Date(lastUpdatedTimestamp * 1000).toLocaleTimeString();

            document.getElementById('updated').textContent = `Last Updated: ${lastUpdatedTime}`;


            function getClothingRecommendation(temp) {
                if (temp <= 0) {
                    return "Wear a heavy coat, gloves, a hat, and a scarf.";
                } else if (temp <= 5) {
                    return "Wear a thick coat, a hat, and gloves.";
                } else if (temp <= 10) {
                    return "Wear a coat and a sweater.";
                } else if (temp <= 15) {
                    return "Wear a light jacket and long sleeves.";
                } else if (temp <= 20) {
                    return "Wear a light jacket or a sweater.";
                } else if (temp <= 25) {
                    return "Wear a t-shirt and jeans or pants.";
                } else if (temp <= 30) {
                    return "Wear a t-shirt and light pants or shorts.";
                } else if (temp <= 35) {
                    return "Wear light, breathable clothing and stay hydrated.";
                } else if (temp <= 40) {
                    return "Wear very light clothing, stay hydrated, and avoid direct sun.";
                } else if (temp <= 45) {
                    return "Wear minimal clothing, stay indoors if possible, and stay hydrated.";
                } else {
                    return "Extreme heat! Wear minimal clothing, stay indoors, and drink plenty of water.";
                }
            }

            const recommendation = getClothingRecommendation(temperature);

            document.getElementById('cloth_recommended').textContent = recommendation


            // Fetch UV Index

            const air_url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

            fetch(air_url)
                .then(response => response.json())
                .then(air_data => {
                    let aqi = air_data.list[0].main.aqi;
                    document.getElementById('aqi-level').textContent = aqiText[aqi].level;
                    document.getElementById('detail_air').textContent = aqiText[aqi].message;


                    const backgroundImage = {
                        1: 'air-pop-imgs/good.png',
                        2: 'air-pop-imgs/fair.png',
                        3: 'air-pop-imgs/moderate.png',
                        4: 'air-pop-imgs/poor.png',
                        5: 'air-pop-imgs/very_poor.png'
                    };

                    const backgroundColor = {
                        1: '#43b710',
                        2: '#eaaf10',
                        3: '#eb8a11',
                        4: '#e83f0f',
                        5: '#8e3acf'
                    }


                    document.getElementById('aqi_img').src = backgroundImage[aqi];
                    document.getElementById('aqi-level').style.backgroundColor = backgroundColor[aqi];
                });

            const url = `https://currentuvindex.com/api/v1/uvi?latitude=${latitude}&longitude=${longitude}`;
            const option = { method: 'GET', headers: { Accept: 'application/json' } };

            fetch(url, option)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const now = data.now;
                    const uvIndex = now.uvi;


                    if (uvIndex >= 0 && uvIndex <= 1) {
                        document.getElementById('uv-index').innerHTML = 'Minimal risk';
                        document.getElementById('uv-index').style = 'background-color: #43b710';
                        document.getElementById('uv_img').src = 'uv-images/uv-0.png';
                        document.getElementById('detail_uv').innerHTML = Uv_0
                    } else if (uvIndex > 1 && uvIndex <= 2) {
                        document.getElementById('uv-index').innerHTML = 'Low risk';
                        document.getElementById('uv-index').style = 'background-color: #43b710';
                        document.getElementById('uv_img').src = 'uv-images/uv-1.png';
                        document.getElementById('detail_uv').innerHTML = Uv_1
                    } else if (uvIndex > 2 && uvIndex <= 3) {
                        document.getElementById('uv-index').innerHTML = 'Low risk';
                        document.getElementById('uv-index').style = 'background-color: #43b710';
                        document.getElementById('uv_img').src = 'uv-images/uv-2.png';
                        document.getElementById('detail_uv').innerHTML = Uv_2
                    } else if (uvIndex > 3 && uvIndex <= 4) {
                        document.getElementById('uv-index').innerHTML = 'Moderate risk';
                        document.getElementById('uv-index').style = 'background-color: #eaaf10';
                        document.getElementById('uv_img').src = 'uv-images/uv-3.png';
                        document.getElementById('detail_uv').innerHTML = Uv_3
                    } else if (uvIndex > 4 && uvIndex <= 5) {
                        document.getElementById('uv-index').innerHTML = 'Moderate risk';
                        document.getElementById('uv-index').style = 'background-color: #eaaf10';
                        document.getElementById('uv_img').src = 'uv-images/uv-4.png';
                        document.getElementById('detail_uv').innerHTML = Uv_4
                    } else if (uvIndex > 5 && uvIndex <= 6) {
                        document.getElementById('uv-index').innerHTML = 'Moderate risk';
                        document.getElementById('uv-index').style = 'background-color: #eaaf10';
                        document.getElementById('uv_img').src = 'uv-images/uv-5.png';
                        document.getElementById('detail_uv').innerHTML = Uv_5
                    } else if (uvIndex > 6 && uvIndex <= 7) {
                        document.getElementById('uv-index').innerHTML = 'High risk';
                        document.getElementById('uv-index').style = 'background-color: #eb8a11';
                        document.getElementById('uv_img').src = 'uv-images/uv-6.png';
                        document.getElementById('detail_uv').innerHTML = Uv_6
                    } else if (uvIndex > 7 && uvIndex <= 8) {
                        document.getElementById('uv-index').innerHTML = 'High risk';
                        document.getElementById('uv-index').style = 'background-color: #eb8a11';
                        document.getElementById('uv_img').src = 'uv-images/uv-7.png';
                        document.getElementById('detail_uv').innerHTML = Uv_7
                    } else if (uvIndex > 8 && uvIndex <= 9) {
                        document.getElementById('uv-index').innerHTML = 'Very high risk';
                        document.getElementById('uv-index').style = 'background-color: #e83f0f';
                        document.getElementById('uv_img').src = 'uv-images/uv-8.png';
                        document.getElementById('detail_uv').innerHTML = Uv_8
                    } else if (uvIndex > 9 && uvIndex <= 10) {
                        document.getElementById('uv-index').innerHTML = 'Very high risk';
                        document.getElementById('uv-index').style = 'background-color: #e83f0f';
                        document.getElementById('uv_img').src = 'uv-images/uv-9.png';
                        document.getElementById('detail_uv').innerHTML = Uv_9
                    } else if (uvIndex > 10 && uvIndex <= 11) {
                        document.getElementById('uv-index').innerHTML = 'Very high risk';
                        document.getElementById('uv-index').style = 'background-color: #e83f0f';
                        document.getElementById('uv_img').src = 'uv-images/uv-10.png';
                        document.getElementById('detail_uv').innerHTML = Uv_10
                    } else if (uvIndex > 11 && uvIndex <= 12) {
                        document.getElementById('uv-index').innerHTML = 'Extreme risk';
                        document.getElementById('uv-index').style = 'background-color: #8e3acf';
                        document.getElementById('uv_img').src = 'uv-images/uv-11.png';
                        document.getElementById('detail_uv').innerHTML = Uv_11
                    } else if (uvIndex > 12 && uvIndex <= 13) {
                        document.getElementById('uv-index').innerHTML = 'Extreme risk';
                        document.getElementById('uv-index').style = 'background-color: #ec0c8b';
                        document.getElementById('uv_img').src = 'uv-images/uv-12.png';
                        document.getElementById('detail_uv').innerHTML = Uv_12
                    } else if (uvIndex > 13) {
                        document.getElementById('uv-index').innerHTML = 'Extreme risk';
                        document.getElementById('uv-index').style = 'background-color: #550ef9';
                        document.getElementById('uv_img').src = 'uv-images/uv-13.png';
                        document.getElementById('detail_uv').innerHTML = Uv_13
                    }

                    hideLoader()

                })



        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            document.querySelector('.no_internet_error').hidden = false;
        });



    currentLocation = null;

} 


const aqiText = {
    1: {
        level: "Good",
        message: "Air quality is considered satisfactory, and air pollution poses little or no risk.",
    },
    2: {
        level: "Fair",
        message: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",

    },
    3: {
        level: "Moderate",
        message: "Member of sensitive groups may experience health effects. The general public is not likely to be affected.",

    },
    4: {
        level: "Poor",
        message: "Everyone may begin to experience health effects; member of sensitive groups may experience more serious health effects.",

    },
    5: {
        level: "Very Poor",
        message: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
    }
}





function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getWeatherByCoordinates(latitude, longitude); // Call getWeatherByCoordinates with coordinates
        }, handleGeolocationError);
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}




function getWeatherByCoordinates(latitude, longitude) {
    showLoader();
    const apiKey = '120d979ba5b2d0780f51872890f5ad0b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;


    setTimeout(() => {
        updateMoonTrackProgress(latitude, longitude)
        updateSunTrackProgress(latitude, longitude);
    }, 500);



    function SendupdateSunTrackProgress(){
        updateSunTrackProgress(latitude, longitude);
    }

    function SendupdateMoonTrackProgress(){
        updateMoonTrackProgress(latitude, longitude)
    }

    setInterval(SendupdateSunTrackProgress, 60000);
    setInterval(SendupdateMoonTrackProgress, 60000);

        localStorage.setItem('currentLong', longitude)
        localStorage.setItem('currentLat', latitude)


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const cityName = data.name;
            const countryName = data.sys.country;
            const temperature = Math.round(data.main.temp);
            const tempF = Math.round(temperature * 9 / 5 + 32);

            const humidity = data.main.humidity;
            const clouds = data.clouds.all
            const iconCode = data.weather[0].icon;
            const description = data.weather[0].description;
            const feelslike = data.main.feels_like;
            const feelslikeF = Math.round(feelslike * 9 / 5 + 32);
            document.getElementById('city-name').innerHTML = `${cityName}, ${countryName}`;

                        const windDirection = data.wind.deg;

                        setTimeout(() => {
                            document.querySelector('.direction').style.transform = `rotate(${windDirection}deg)`
                        }, 300);

                        const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
                        const index = Math.round((windDirection % 360) / 45);
                        document.getElementById('directionWind').textContent = directions[index]

            if(SelectedTempUnit === 'fahrenheit'){
                document.getElementById('temp').innerHTML = `${tempF}<span>°F</span>`;
             document.getElementById('temPDiscCurrentLocation').innerHTML = `${tempF}°F • <span>${description}</span>`
         document.getElementById('willFeelLike').innerHTML = ` ${Math.round(feelslikeF + 3)}°F`

            } else{
            document.getElementById('temp').innerHTML = `${temperature}<span>°C</span>`;

            document.getElementById('temPDiscCurrentLocation').innerHTML = `${temperature}°C • <span>${description}</span>`
             document.getElementById('willFeelLike').innerHTML = ` ${Math.round(feelslike + 3)}°C`

            }

                        if(temperature > 32){
                            document.querySelector('.excessiveHeat').hidden = false;
                        } else{
                            document.querySelector('.excessiveHeat').hidden = true;
                        }



                        if (data.rain && data.rain['1h']) {
                            const precipitation = data.rain['1h'];
                            if (precipitation > 0) {
                                document.getElementById('AmountRainMM').innerHTML = `${data.rain['1h'].toFixed(1)} mm`
                                document.querySelector('noRain').hidden = true;


                            }
                        } else {
                            document.querySelector('noRain').hidden = false;
                            document.getElementById('AmountRainMM').innerHTML = `0.0 mm`
                        }

              document.getElementById('currentLocationName').textContent = `${cityName}, ${countryName}`;
                 document.getElementById('currentSearchImg').src = `weather-icons/${iconCode}.svg`;


            document.getElementById('description').textContent = description;
            const visibility = data.visibility;
            const visibilityInMiles = (visibility * 0.000621371).toFixed(0);


            const weatherIcon = document.getElementById('weather-icon');
            weatherIcon.src = `weather-icons/${iconCode}.svg`
                        document.getElementById('froggie_imgs').src = `froggie/${iconCode}.png`;
                        document.documentElement.setAttribute('iconCodeTheme', `${iconCode}`);
                        localStorage.setItem('weatherTHEME', iconCode)
                        sendThemeToAndroid(iconCode)

            weatherIcon.title = `${iconCode}`;
            // Fetch 24-hour forecast
            get24HourForecast(latitude, longitude);

            // Fetch 5-day forecast
            get5DayForecast(latitude, longitude);

            // Additional weather information
            const windSpeedMPS = data.wind.speed;
            const windSpeedMPH = (windSpeedMPS * 2.23694).toFixed(0);
            const windSpeedKPH = (windSpeedMPS * 3.6).toFixed(0); // Convert m/s to km/h
            const timeZoneOffsetSeconds = data.timezone;
            const sunriseUTC = new Date((data.sys.sunrise + timeZoneOffsetSeconds) * 1000);
            const sunsetUTC = new Date((data.sys.sunset + timeZoneOffsetSeconds) * 1000);
            const maxTemp = data.main.temp_max;
            const minTemp = data.main.temp_min;

            const options = { timeZone: 'UTC', hour: 'numeric', minute: 'numeric' };
            const sunrise = sunriseUTC.toLocaleTimeString('en-US', options);
            const sunset = sunsetUTC.toLocaleTimeString('en-US', options);

            
            if(SelectedWindUnit === 'mile'){
                document.getElementById('wind-speed').textContent = `${windSpeedMPH} mph`;
            } else{
                document.getElementById('wind-speed').textContent = `${windSpeedKPH} km/h`;

            }

            if(SelectedVisibiltyUnit === 'mileV'){
                document.getElementById('min-temp').innerHTML = `${visibilityInMiles} mile`;

            } else{
                document.getElementById('min-temp').innerHTML = `${(visibility / 1000).toFixed(0)} km`;
            }



            let visibilityInKm = visibility / 1000;
            let maxVisibility = 15;

            let visibilityPercentage = Math.min(visibilityInKm / maxVisibility, 1);

            document.querySelector('.md-circle01').setAttribute('value', visibilityPercentage.toString());


            document.getElementById('sunrise').textContent = sunrise;
            document.getElementById('sunset').textContent = sunset;

            document.getElementById('humidity').textContent = ` ${humidity}% `;
            document.getElementById('clouds').textContent = `${clouds}%`;
            document.querySelector('humidityBarProgress').style.height = `${humidity}%`;



            const lastUpdatedTimestamp = data.dt;
            const lastUpdatedTime = new Date(lastUpdatedTimestamp * 1000).toLocaleTimeString();

            document.getElementById('updated').textContent = `Last Updated: ${lastUpdatedTime}`;



                            function getClothingRecommendation(temp) {
                                if (temp <= 0) {
                                    return "Wear a heavy coat, gloves, a hat, and a scarf.";
                                } else if (temp <= 5) {
                                    return "Wear a thick coat, a hat, and gloves.";
                                } else if (temp <= 10) {
                                    return "Wear a coat and a sweater.";
                                } else if (temp <= 15) {
                                    return "Wear a light jacket and long sleeves.";
                                } else if (temp <= 20) {
                                    return "Wear a light jacket or a sweater.";
                                } else if (temp <= 25) {
                                    return "Wear a t-shirt and jeans or pants.";
                                } else if (temp <= 30) {
                                    return "Wear a t-shirt and light pants or shorts.";
                                } else if (temp <= 35) {
                                    return "Wear light, breathable clothing and stay hydrated.";
                                } else if (temp <= 40) {
                                    return "Wear very light clothing, stay hydrated, and avoid direct sun.";
                                } else if (temp <= 45) {
                                    return "Wear minimal clothing, stay indoors if possible, and stay hydrated.";
                                } else {
                                    return "Extreme heat! Wear minimal clothing, stay indoors, and drink plenty of water.";
                                }
                            }

                            const recommendation = getClothingRecommendation(temperature);

                            document.getElementById('cloth_recommended').textContent = recommendation



            const air_url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

            fetch(air_url)
                .then(response => response.json())
                .then(air_data => {
                    let aqi = air_data.list[0].main.aqi;
                    document.getElementById('aqi-level').textContent = aqiText[aqi].level;
                    document.getElementById('detail_air').textContent = aqiText[aqi].message;


                    const backgroundImage = {
                        1: 'air-pop-imgs/good.png',
                        2: 'air-pop-imgs/fair.png',
                        3: 'air-pop-imgs/moderate.png',
                        4: 'air-pop-imgs/poor.png',
                        5: 'air-pop-imgs/very_poor.png'
                    };

                    const backgroundColor = {
                        1: '#43b710',
                        2: '#eaaf10',
                        3: '#eb8a11',
                        4: '#e83f0f',
                        5: '#8e3acf'
                    }


                    document.getElementById('aqi_img').src = backgroundImage[aqi];
                    document.getElementById('aqi-level').style.backgroundColor = backgroundColor[aqi];
                })

            const url = `https://currentuvindex.com/api/v1/uvi?latitude=${latitude}&longitude=${longitude}`;
            const option = { method: 'GET', headers: { Accept: 'application/json' } };

            fetch(url, option)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const now = data.now;
                    const uvIndex = now.uvi;


                    if (uvIndex >= 0 && uvIndex <= 1) {
                        document.getElementById('uv-index').innerHTML = 'Minimal risk';
                        document.getElementById('uv-index').style = 'background-color: #43b710';
                        document.getElementById('uv_img').src = 'uv-images/uv-0.png';
                        document.getElementById('detail_uv').innerHTML = Uv_0
                    } else if (uvIndex > 1 && uvIndex <= 2) {
                        document.getElementById('uv-index').innerHTML = 'Low risk';
                        document.getElementById('uv-index').style = 'background-color: #43b710';
                        document.getElementById('uv_img').src = 'uv-images/uv-1.png';
                        document.getElementById('detail_uv').innerHTML = Uv_1
                    } else if (uvIndex > 2 && uvIndex <= 3) {
                        document.getElementById('uv-index').innerHTML = 'Low risk';
                        document.getElementById('uv-index').style = 'background-color: #43b710';
                        document.getElementById('uv_img').src = 'uv-images/uv-2.png';
                        document.getElementById('detail_uv').innerHTML = Uv_2
                    } else if (uvIndex > 3 && uvIndex <= 4) {
                        document.getElementById('uv-index').innerHTML = 'Moderate risk';
                        document.getElementById('uv-index').style = 'background-color: #eaaf10';
                        document.getElementById('uv_img').src = 'uv-images/uv-3.png';
                        document.getElementById('detail_uv').innerHTML = Uv_3
                    } else if (uvIndex > 4 && uvIndex <= 5) {
                        document.getElementById('uv-index').innerHTML = 'Moderate risk';
                        document.getElementById('uv-index').style = 'background-color: #eaaf10';
                        document.getElementById('uv_img').src = 'uv-images/uv-4.png';
                        document.getElementById('detail_uv').innerHTML = Uv_4
                    } else if (uvIndex > 5 && uvIndex <= 6) {
                        document.getElementById('uv-index').innerHTML = 'Moderate risk';
                        document.getElementById('uv-index').style = 'background-color: #eaaf10';
                        document.getElementById('uv_img').src = 'uv-images/uv-5.png';
                        document.getElementById('detail_uv').innerHTML = Uv_5
                    } else if (uvIndex > 6 && uvIndex <= 7) {
                        document.getElementById('uv-index').innerHTML = 'High risk';
                        document.getElementById('uv-index').style = 'background-color: #eb8a11';
                        document.getElementById('uv_img').src = 'uv-images/uv-6.png';
                        document.getElementById('detail_uv').innerHTML = Uv_6
                    } else if (uvIndex > 7 && uvIndex <= 8) {
                        document.getElementById('uv-index').innerHTML = 'High risk';
                        document.getElementById('uv-index').style = 'background-color: #eb8a11';
                        document.getElementById('uv_img').src = 'uv-images/uv-7.png';
                        document.getElementById('detail_uv').innerHTML = Uv_7
                    } else if (uvIndex > 8 && uvIndex <= 9) {
                        document.getElementById('uv-index').innerHTML = 'Very high risk';
                        document.getElementById('uv-index').style = 'background-color: #e83f0f';
                        document.getElementById('uv_img').src = 'uv-images/uv-8.png';
                        document.getElementById('detail_uv').innerHTML = Uv_8
                    } else if (uvIndex > 9 && uvIndex <= 10) {
                        document.getElementById('uv-index').innerHTML = 'Very high risk';
                        document.getElementById('uv-index').style = 'background-color: #e83f0f';
                        document.getElementById('uv_img').src = 'uv-images/uv-9.png';
                        document.getElementById('detail_uv').innerHTML = Uv_9
                    } else if (uvIndex > 10 && uvIndex <= 11) {
                        document.getElementById('uv-index').innerHTML = 'Very high risk';
                        document.getElementById('uv-index').style = 'background-color: #e83f0f';
                        document.getElementById('uv_img').src = 'uv-images/uv-10.png';
                        document.getElementById('detail_uv').innerHTML = Uv_10
                    } else if (uvIndex > 11 && uvIndex <= 12) {
                        document.getElementById('uv-index').innerHTML = 'Extreme risk';
                        document.getElementById('uv-index').style = 'background-color: #8e3acf';
                        document.getElementById('uv_img').src = 'uv-images/uv-11.png';
                        document.getElementById('detail_uv').innerHTML = Uv_11
                    } else if (uvIndex > 12 && uvIndex <= 13) {
                        document.getElementById('uv-index').innerHTML = 'Extreme risk';
                        document.getElementById('uv-index').style = 'background-color: #ec0c8b';
                        document.getElementById('uv_img').src = 'uv-images/uv-12.png';
                        document.getElementById('detail_uv').innerHTML = Uv_12
                    } else if (uvIndex > 13) {
                        document.getElementById('uv-index').innerHTML = 'Extreme risk';
                        document.getElementById('uv-index').style = 'background-color: #550ef9';
                        document.getElementById('uv_img').src = 'uv-images/uv-13.png';
                        document.getElementById('detail_uv').innerHTML = Uv_13
                    }

                    hideLoader()

                })



        })
          .catch(error => {
                    console.error('Error fetching current weather:', error);
                    document.querySelector('.no_internet_error').hidden = false;
                });

    currentLocation = {
        latitude,
        longitude
    };

}


function updateSunTrackProgress(latitude, longitude) {
    const apiKey = '120d979ba5b2d0780f51872890f5ad0b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const timeZoneOffsetSeconds = data.timezone;
            const sunriseUTC = new Date((data.sys.sunrise + timeZoneOffsetSeconds) * 1000);
            const sunsetUTC = new Date((data.sys.sunset + timeZoneOffsetSeconds) * 1000);
            const currentTime = new Date();

            const totalDaylight = sunsetUTC - sunriseUTC;
            const timeSinceSunrise = currentTime - sunriseUTC;
            const percentageOfDaylight = (timeSinceSunrise / totalDaylight) * 100;

            const progressWidth = Math.min(Math.max(percentageOfDaylight, 0), 100);

            document.querySelector('suntrackprogress').style.width = `${progressWidth}%`;

            console.log('updated')
        })
        .catch(error => {
            console.error('Error fetching sunrise/sunset data:', error);
        });
}


function get24HourForecast(latitude, longitude) {
    const apiKey = '28fe7b5f9a78838c639143fc517e4343';
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,daily,alerts&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const forecastData = data.hourly;
            display24HourForecast(forecastData);
        })
        .catch(error => console.error('Error fetching 24-hour forecast:', error));
}


function display24HourForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast');
        const RainBarsContainer = document.querySelector('rainMeterBar');

    forecastContainer.innerHTML = ''; 

    if (forecastData && forecastData.length >= 24) {
        for (let i = 0; i < 24; i++) {
            const forecast = forecastData[i];
            const timestamp = new Date(forecast.dt * 1000);
            const time = timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(/\s/g, '');


                const temperature = Math.round(forecast.temp);
                const tempF = Math.round(temperature * 9 / 5 + 32);

                


            const iconCode = forecast.weather[0].icon;
            const description = forecast.weather[0].description;
            const rainPercentage = forecast.pop * 100;
            const rainMeterBarItem = document.createElement('rainMeterBarItem');


            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.id = "forecast24";

            if(SelectedTempUnit === 'fahrenheit'){
                forecastItem.innerHTML = `
                <p class="time-24">${time}</p>
                <img id="icon-24" src="weather-icons/${iconCode}.svg" alt="Weather Icon" class="icon-24">
                <p class="temp-24">${tempF}°F</p>

                 <p class="disc_sml-24" >${description}</p>
                  <md-ripple style="--md-ripple-pressed-opacity: 0.1;"></md-ripple>

            `;
            } else{
            forecastItem.innerHTML = `
            <p class="time-24">${time}</p>
            <img id="icon-24" src="weather-icons/${iconCode}.svg" alt="Weather Icon" class="icon-24">
            <p class="temp-24">${temperature}°C</p>

             <p class="disc_sml-24" >${description}</p>
              <md-ripple style="--md-ripple-pressed-opacity: 0.1;"></md-ripple>

        `;
            }

            rainMeterBarItem.innerHTML = `
                <rainPerBar>
                  <rainPerBarProgress style="height: ${Math.round(rainPercentage)}%;">
                </rainPerBarProgress>
                </rainPerBar>
                <p>${Math.round(rainPercentage)}%</p>
                 <span>${time}</span>


            `

            forecastItem.addEventListener('click', ()=>{
                ShowSnack(`<span style="text-transform: capitalize;">${description}</span>`, 2000, 3, 'none', ' ', 'no-up')

            });


            RainBarsContainer.append(rainMeterBarItem)
            

            forecastContainer.appendChild(forecastItem);

        }
    } else {
        console.error('Error fetching 24-hour forecast: Data is missing or insufficient');
                forecastContainer.innerHTML = `
                                    <div style="display: flex; align-items: center; justify-content: center; width: 100%;">
                                <md-circular-progress indeterminate ></md-circular-progress></div>`
    }
}

function showToast(description, time) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `${description} at ${time}`;


    const toastContainer = document.getElementById('toast-container');
    toastContainer.appendChild(toast);


    setTimeout(() => {
        toast.style.opacity = '0';

        setTimeout(() => {
            toastContainer.removeChild(toast);

        }, 500);
    }, 3000);
}
function get5DayForecast(latitude, longitude) {
    const apiKey = '28fe7b5f9a78838c639143fc517e4343';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const forecastData = data.list;
            display5DayForecast(forecastData);
        })
        .catch(error => console.error('Error fetching 5-day forecast:', error));
}

function display5DayForecast(forecastData) {
    const forecast5dayContainer = document.getElementById('forecast-5day');
    forecast5dayContainer.innerHTML = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 7; i < forecastData.length; i += 8) {
        const forecast = forecastData[i];
        const timestamp = new Date(forecast.dt * 1000);


        if (timestamp.getDate() === today.getDate()) {
            continue;
        }

        const date = timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        const description = forecast.weather[0].description;
        let iconCode = forecast.weather[0].icon;
        const temp = Math.round(forecast.main.temp);

        const tempF = Math.round(temp * 9 / 5 + 32);




        iconCode = iconCode.replace('n', 'd');

        let tempColor;
        if (temp <= -50) {
            tempColor = 'blue';
        } else if (temp <= 0) {
            tempColor = 'lightblue'; 
        } else if (temp <= 25) {
            tempColor = 'rgb(9, 185, 9)'; 
        } else {
            tempColor = 'red'; 
        }


        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item-forecast');


        if(SelectedTempUnit === 'fahrenheit'){
            forecastItem.innerHTML = `

            <img id="icon-5d" src="weather-icons/${iconCode}.svg" alt="Weather Icon">
            <p class="disc-5d">${tempF}°F</p>
            <div class="temp_progress_hold">
            <md-linear-progress value="0" id="temp-bar-${i}" style="--md-linear-progress-active-indicator-color: ${tempColor};"></md-linear-progress></div>
            <div class="d5-disc-text">${description}
            <p class="time-5d">${date}</p>
            </div>

        `;
        } else{

        forecastItem.innerHTML = `

        <img id="icon-5d" src="weather-icons/${iconCode}.svg" alt="Weather Icon">
        <p class="disc-5d">${temp}°C</p>
        <div class="temp_progress_hold">
        <md-linear-progress value="0" id="temp-bar-${i}" style="--md-linear-progress-active-indicator-color: ${tempColor};"></md-linear-progress></div>
        <div class="d5-disc-text">${description}
        <p class="time-5d">${date}</p>
        </div>

    `;
        }



        const minTemp = -70;
        const maxTemp = 60;
        const value = (temp - minTemp) / (maxTemp - minTemp);
        setTimeout(() => {
            document.getElementById(`temp-bar-${i}`).value = value;
        }, 0);


        forecast5dayContainer.appendChild(forecastItem);
        
    }
}



function showLoader() {
    const loaderContainer = document.getElementById('loader-container');
    loaderContainer.style.display = 'flex';
    loaderContainer.style.opacity = '1';
                document.getElementById('city-open').disabled = true;
                document.querySelector('rainmeterbar').scrollLeft = 0

}

// Hide the loader
function hideLoader() {
    const loaderContainer = document.getElementById('loader-container');

    loaderContainer.style.opacity = '0';

    setTimeout(() => {
        loaderContainer.style.display = 'none';
                document.getElementById('city-open').disabled = false;

    }, 300);


}



document.getElementById('forecast').addEventListener('scroll', function () {
    var items = document.querySelectorAll('.forecast .forecast-item');
    var scrollPosition = document.getElementById('forecast').scrollLeft;
    var windowWidth = document.getElementById('forecast').offsetWidth;

    items.forEach(function (item) {
        var itemOffset = item.offsetLeft - scrollPosition;
        var isVisible = (itemOffset >= 0 && itemOffset < windowWidth);
        if (isVisible) {
            item.style.scale = 1;

        } else {
            item.style.scale = 0.5;
        }
    });
});




function updateMoonTrackProgress(lat, long) {
    fetch(`https://api.ipgeolocation.io/astronomy?apiKey=f22c81e7a0b5448e812ad5e0e1c25242&lat=${lat}&long=${long}`)
        .then(response => response.json())
        .then(data => {
            const moonriseTime = parseTime(data.moonrise);
            const moonsetTime = parseTime(data.moonset);
            const currentTime = new Date();

            const totalMoonlight = moonsetTime - moonriseTime;
            const timeSinceMoonrise = currentTime - moonriseTime;
            const percentageOfMoonlight = (timeSinceMoonrise / totalMoonlight) * 100;

            const moonProgressWidth = Math.min(Math.max(percentageOfMoonlight, 0), 100);

            document.querySelector('moontrackprogress').style.width = `${moonProgressWidth}%`;

            const moonrise = formatTimeMoonRiseMoonSet(data.moonrise);
            const moonset = formatTimeMoonRiseMoonSet(data.moonset);
            document.getElementById('moonrise').textContent = `${moonrise}`;
            document.getElementById('moonset').textContent = `${moonset}`;
            console.log('updated')

        })
        .catch(error => {
            console.error('Error fetching moonrise/moonset data:', error);
        });
}

function parseTime(time24) {
    const [hours, minutes] = time24.split(':').map(Number);
    const currentDate = new Date();
    const time = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes);
    return time;
}

function formatTimeMoonRiseMoonSet(time24) {
    let [hours, minutes] = time24.split(':').map(Number);

    minutes = Math.round(minutes);

    if (minutes === 60) {
        minutes = 0;
        hours += 1;
    }

    const period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    minutes = minutes.toString().padStart(2, '0');

    return `${hours}:${minutes} ${period}`;
}


function refreshWeather(){
    const latSend = localStorage.getItem('currentLat')
    const longSend = localStorage.getItem('currentLong')

    getWeather(' ',latSend, longSend)
}


function sendThemeToAndroid(theme) {

    AndroidInterface.updateStatusBarColor(theme);
  };
function Toast(toastText, time){
    ToastAndroidShow.ShowToast(toastText, time);
}
