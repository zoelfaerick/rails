
function DisplayCurrentAccuweatherData(data, lat, lon){
    const SelectedTempUnit = localStorage.getItem('SelectedTempUnit');

    const condition_text = data[0].WeatherIcon;

    let Temperature;


    if (SelectedTempUnit === 'fahrenheit') {
        Temperature = Math.round(data[0].Temperature.Imperial.Value);

    } else {
        Temperature = Math.round(data[0].Temperature.Metric.Value);

    }

    document.getElementById('weather-icon').src =  GetWeatherIconAccu(condition_text)

    animateTemp(Temperature)
    document.getElementById('description').innerHTML = getAccuWeatherLabelInLang(condition_text, localStorage.getItem('AppLanguageCode'))

    document.documentElement.setAttribute('iconcodetheme', GetWeatherIconAccuTheme(condition_text))
    sendThemeToAndroid(GetWeatherIconAccuTheme(condition_text))
    document.getElementById('froggie_imgs').src = GetWeatherIconAccuFrog(condition_text)

        renderHomeLocationSearchData()

            function renderHomeLocationSearchData(){
                const checkIFitsSavedLocation = JSON.parse(localStorage.getItem('DefaultLocation'));

                  function isApproxEqual(val1, val2, epsilon = 0.0001) {
                    return Math.abs(val1 - val2) < epsilon;
                  }

                  if (checkIFitsSavedLocation) {
                    const savedLat = parseFloat(checkIFitsSavedLocation.lat);
                    const savedLon = parseFloat(checkIFitsSavedLocation.lon);
                    const savedName = checkIFitsSavedLocation.name;

                    if ((savedLat !== undefined && savedLon !== undefined && isApproxEqual(lat, savedLat) && isApproxEqual(lon, savedLon))) {
                     document.getElementById('temPDiscCurrentLocation').innerHTML = `${GetWeatherTextAccu(condition_text)}`
                     document.getElementById('currentSearchImg').src = `${GetWeatherIconAccu(condition_text)}`;
                    document.querySelector('mainCurrenttemp').innerHTML = `${Temperature}°`
                    }
                  }
     }
}


// convert icons

function GetWeatherTextAccu(iconCodeAccu) {


        if (iconCodeAccu === 1) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeSnow()
                removeStars()
                removeThunder()
                displayLeaves()
            }
            return 'sunny'

        } else if (iconCodeAccu === 2) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                displayClouds()
                removeRain()
                removeFog()
                removeSnow()
                displayLeaves()
                removeStars()
                removeThunder()
            }
            return 'mostly_sunny'

        } else if (iconCodeAccu === 3 || iconCodeAccu === 4) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeDrizzle()
                displayClouds()
                removeCloudsFull()
                removeRain()
                removeFog()
                removeSnow()
                displayLeaves()
                removeStars()
                removeThunder()
            }
            return 'partly_sunny'

        } else if (iconCodeAccu === 5) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                displayFog()
                removeSnow()
                removeLeaves()
                removeStars()
                removeThunder()
            }
            return 'hazy_sunshine'

        } else if (iconCodeAccu === 6) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeDrizzle()
                removeClouds()
                displayCloudsFull()
                removeRain()
                removeLeaves()
                removeFog()
                removeSnow()
                removeStars()
                removeThunder()
            }
            return 'mostly_cloudy'

        } else if (iconCodeAccu === 7) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeDrizzle()
                removeClouds()
                displayCloudsFull()
                removeRain()
                removeLeaves()
                removeFog()
                removeSnow()
                removeStars()
                removeThunder()
            }
            return 'cloudy'

        } else if (iconCodeAccu === 8) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeDrizzle()
                removeClouds()
                displayCloudsFull()
                removeRain()
                removeLeaves()
                removeFog()
                removeSnow()
                removeStars()
                removeThunder()
            }
            return 'overcast'

        } else if (iconCodeAccu === 11) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                displayFog()
                removeSnow()
                removeLeaves()
                removeStars()
                removeThunder()
            }
            return 'fog'

        } else if (iconCodeAccu === 12) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                displayRain()
                removeFog()
                removeLeaves()
                removeSnow()
                removeStars()
                removeThunder()
            }
            return 'showers'

        } else if (iconCodeAccu === 13) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                displayDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeSnow()
                removeLeaves()
                removeStars()
                removeThunder()
            }
            return 'light_rain'

        } else if (iconCodeAccu === 14) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                displayRain()
                removeFog()
                removeLeaves()
                removeSnow()
                removeStars()
                removeThunder()
            }
            return 'rainy'

        } else if (iconCodeAccu === 15) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                displayRain()
                removeLeaves()
                removeFog()
                removeSnow()
                removeStars()
                displayThunder()
            }
            return 't_storms'

        } else if (iconCodeAccu === 16) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                displayRain()
                removeLeaves()
                removeFog()
                removeSnow()
                removeStars()
                displayThunder()
            }
            return 'cloudy_t_storms'

        } else if (iconCodeAccu === 17) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                displayRain()
                removeFog()
                removeLeaves()
                removeSnow()
                removeStars()
                removeThunder()
            }
            return 'sunny_t_storms'

        } else if (iconCodeAccu === 18) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                displayRain()
                removeFog()
                removeLeaves()
                removeSnow()
                removeStars()
                removeThunder()
            }
            return 'rain'

        } else if (iconCodeAccu === 19) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                displaySnow()
                removeLeaves()
                removeStars()
                removeThunder()
            }
            return 'flurries'

        } else if (iconCodeAccu === 20) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeLeaves()
                displaySnow()
                removeStars()
                removeThunder()
            }
            return 'moderate_flurries'

        } else if (iconCodeAccu === 21) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeLeaves()
                displaySnow()
                removeStars()
                removeThunder()
            }
            return 'slight_flurries'

        } else if (iconCodeAccu === 22) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeLeaves()
                displaySnow()
                removeStars()
                removeThunder()
            }
            return 'snow'

        } else if (iconCodeAccu === 23) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeLeaves()
                displaySnow()
                removeStars()
                removeThunder()
            }
            return 'cloudy_snow'

        } else if (iconCodeAccu === 24) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeLeaves()
                displaySnow()
                removeStars()
                removeThunder()
            }
            return 'ice'

        } else if (iconCodeAccu === 25) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeLeaves()
                displaySnow()
                removeStars()
                removeThunder()
            }
            return 'sleet'

        } else if (iconCodeAccu === 26) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                displayRain()
                removeFog()
                removeLeaves()
                removeSnow()
                removeStars()
                removeThunder()
            }
            return 'freezing_rain'

        } else if (iconCodeAccu === 29) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeLeaves()
                displaySnow()
                removeStars()
                removeThunder()
            }
            return 'rain_and_snow'

        }
       else if (iconCodeAccu === 30) {
        if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
        } else {
            removeCloudsFull()
            removeDrizzle()
            removeClouds()
            removeRain()
            removeFog()
            removeSnow()
            removeStars()
            removeThunder()
            displayLeaves()
        }
            return 'hot'

        } else if (iconCodeAccu === 31) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeLeaves()
                removeSnow()
                removeThunder()
                displayStars()
            }
            return 'cold'

        } else if (iconCodeAccu === 32) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                displayClouds()
                removeRain()
                removeFog()
                removeSnow()
                removeLeaves()
                displayStars()
                removeThunder()
            }
            return 'windy'

        } else if (iconCodeAccu === 33) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeLeaves()
                removeSnow()
                removeThunder()
                displayStars()
            }
            return 'clear'

        } else if (iconCodeAccu === 34 ) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                displayClouds()
                removeRain()
                removeFog()
                removeSnow()
                removeLeaves()
                displayStars()
                removeThunder()
            }
            return 'mostly_clear'

        } else if (iconCodeAccu === 35) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeDrizzle()
                displayClouds()
                removeCloudsFull()
                removeRain()
                removeFog()
                removeSnow()
                removeLeaves()
                displayStars()
                removeThunder()
            }
            return 'partly_cloudy'

        } else if (iconCodeAccu === 36) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeDrizzle()
                displayClouds()
                removeCloudsFull()
                removeRain()
                removeFog()
                removeSnow()
                removeLeaves()
                removeStars()
                removeThunder()
            }
            return 'intermittent_clouds'

        } else if (iconCodeAccu === 37) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeLeaves()
                removeRain()
                displayFog()
                removeSnow()
                removeStars()
                removeThunder()
            }
            return 'hazy_moonlight'

        } else if (iconCodeAccu === 38) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeDrizzle()
                removeClouds()
                displayCloudsFull()
                removeRain()
                removeFog()
                removeLeaves()
                removeSnow()
                removeStars()
                removeThunder()
            }
            return 'mostly_cloudy'

        } else if (iconCodeAccu === 39 ) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                displayDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeSnow()
                removeLeaves()
                removeStars()
                removeThunder()
            }
            return 'light_rain'

        } else if (iconCodeAccu === 40) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                displayRain()
                removeFog()
                removeLeaves()
                removeSnow()
                removeStars()
                removeThunder()
            }
            return 'rainy'

        } else if (iconCodeAccu === 41) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                displayRain()
                removeLeaves()
                removeFog()
                removeSnow()
                removeStars()
                displayThunder()
            }
            return 'light_t_storms'

        } else if (iconCodeAccu === 42) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                displayRain()
                removeLeaves()
                removeFog()
                removeSnow()
                removeStars()
                displayThunder()
            }
            return 'light_t_storms'

        } else if (iconCodeAccu === 43) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeLeaves()
                displaySnow()
                removeStars()
                removeThunder()
            }
            return 'light_flurries'

        } else if (iconCodeAccu === 44) {
            if (localStorage.getItem('UseBackgroundAnimations') && localStorage.getItem('UseBackgroundAnimations') === 'false') {
            } else {
                removeCloudsFull()
                removeDrizzle()
                removeClouds()
                removeRain()
                removeFog()
                removeLeaves()
                displaySnow()
                removeStars()
                removeThunder()
            }
            return 'light_snow'

        }

    return iconCodeAccu
}

function getAccuWeatherLabelInLang(condition_text, langCode) {
    const translationKey = GetWeatherTextAccu(condition_text);

    const translatedLabel = getTranslationByLang(langCode, translationKey);

    return translatedLabel || 'Unknown weather';
}


// accu icons

function GetWeatherIconAccu(Accuweathericon) {


    if (Accuweathericon === 1) {
        return 'weather-icons/clear_day.svg'

    } else if (Accuweathericon === 2) {
        return 'weather-icons/mostly_clear_day.svg'

    } else if (Accuweathericon === 3 || Accuweathericon === 4) {
        return 'weather-icons/partly_cloudy_day.svg'

    } else if (Accuweathericon === 5) {
        return 'weather-icons/haze_fog_dust_smoke.svg'

    } else if (Accuweathericon === 6) {
        return 'weather-icons/mostly_cloudy_day.svg'

    } else if (Accuweathericon === 7) {
        return 'weather-icons/cloudy.svg'

    } else if (Accuweathericon === 8) {
        return 'weather-icons/cloudy.svg'

    } else if (Accuweathericon === 11) {
        return 'weather-icons/haze_fog_dust_smoke.svg'

    } else if (Accuweathericon === 12) {
        return 'weather-icons/showers_rain.svg'

    } else if (Accuweathericon === 13) {
        return 'weather-icons/scattered_showers_day.svg'

    } else if (Accuweathericon === 14) {
        return 'weather-icons/scattered_showers_day.svg'

    } else if (Accuweathericon === 15) {
        return 'weather-icons/isolated_thunderstorms.svg'

    } else if (Accuweathericon === 16) {
        return 'weather-icons/isolated_scattered_thunderstorms_day.svg'

    } else if (Accuweathericon === 17) {
        return 'weather-icons/isolated_scattered_thunderstorms_day.svg'

    } else if (Accuweathericon === 18) {
        return 'weather-icons/showers_rain.svg'

    } else if (Accuweathericon === 19) {
        return 'weather-icons/flurries.svg'

    } else if (Accuweathericon === 20) {
        return 'weather-icons/flurries.svg'

    } else if (Accuweathericon === 21) {
        return 'weather-icons/flurries.svg'

    } else if (Accuweathericon === 22) {
        return 'weather-icons/showers_snow.svg'

    } else if (Accuweathericon === 23) {
        return 'weather-icons/cloudy_with_snow.svg'

    } else if (Accuweathericon === 24) {
        return 'weather-icons/icy.svg'

    } else if (Accuweathericon === 25) {
        return 'weather-icons/sleet_hail.svg'

    } else if (Accuweathericon === 26) {
        return 'weather-icons/mixed_rain_hail_sleet.svg'

    } else if (Accuweathericon === 29) {
        return 'weather-icons/mixed_rain_snow.svg'

    }
   else if (Accuweathericon === 30) {
        return 'weather-icons/very_hot.svg'

    } else if (Accuweathericon === 31) {
        return 'weather-icons/very_cold.svg'

    } else if (Accuweathericon === 32) {
        return 'weather-icons/windy_breezy.svg'

    } else if (Accuweathericon === 33) {
        return 'weather-icons/clear_night.svg'

    } else if (Accuweathericon === 34 ) {
        return 'weather-icons/mostly_clear_night.svg'

    } else if (Accuweathericon === 35) {
        return 'weather-icons/partly_cloudy_night.svg'

    } else if (Accuweathericon === 36) {
        return 'weather-icons/partly_cloudy_night.svg'

    } else if (Accuweathericon === 37) {
        return 'weather-icons/haze_fog_dust_smoke.svg'

    } else if (Accuweathericon === 38) {
        return 'weather-icons/mostly_cloudy_night.svg'

    } else if (Accuweathericon === 39 ) {
        return 'weather-icons/cloudy_with_rain.svg'

    } else if (Accuweathericon === 40) {
        return 'weather-icons/cloudy_with_rain.svg'

    } else if (Accuweathericon === 41) {
        return 'weather-icons/isolated_scattered_thunderstorms_night.svg'

    } else if (Accuweathericon === 42) {
        return 'weather-icons/isolated_scattered_thunderstorms_night.svg'

    } else if (Accuweathericon === 43) {
        return 'weather-icons/flurries.svg'

    } else if (Accuweathericon === 44) {
        return 'weather-icons/flurries.svg'

    }

return Accuweathericon
}


// accu app theme

function GetWeatherIconAccuTheme(AccuweathericonTheme) {


    if (AccuweathericonTheme === 1) {
        return 'clear-day'

    } else if (AccuweathericonTheme === 2) {
        return 'cloudy'

    } else if (AccuweathericonTheme === 3 || AccuweathericonTheme === 4) {
        return 'cloudy'

    } else if (AccuweathericonTheme === 5) {
        return 'fog'

    } else if (AccuweathericonTheme === 6) {
        return 'cloudy'

    } else if (AccuweathericonTheme === 7) {
        return 'overcast'

    } else if (AccuweathericonTheme === 8) {
        return 'overcast'

    } else if (AccuweathericonTheme === 11) {
        return 'fog'

    } else if (AccuweathericonTheme === 12) {
        return 'rain'

    } else if (AccuweathericonTheme === 13) {
        return 'rain'

    } else if (AccuweathericonTheme === 14) {
        return 'rain'

    } else if (AccuweathericonTheme === 15) {
        return 'thunder'

    } else if (AccuweathericonTheme === 16) {
        return 'thunder'

    } else if (AccuweathericonTheme === 17) {
        return 'thunder'

    } else if (AccuweathericonTheme === 18) {
        return 'rain'

    } else if (AccuweathericonTheme === 19) {
        return 'snow'

    } else if (AccuweathericonTheme === 20) {
        return 'snow'

    } else if (AccuweathericonTheme === 21) {
        return 'snow'

    } else if (AccuweathericonTheme === 22) {
        return 'snow'

    } else if (AccuweathericonTheme === 23) {
        return 'snow'

    } else if (AccuweathericonTheme === 24) {
        return 'snow'

    } else if (AccuweathericonTheme === 25) {
        return 'snow'

    } else if (AccuweathericonTheme === 26) {
        return 'snow'

    } else if (AccuweathericonTheme === 29) {
        return 'snow'

    }
   else if (AccuweathericonTheme === 30) {
        return 'clear-day'

    } else if (AccuweathericonTheme === 31) {
        return 'clear-night'

    } else if (AccuweathericonTheme === 32) {
        return 'cloudy'

    } else if (AccuweathericonTheme === 33) {
        return 'clear-night'

    } else if (AccuweathericonTheme === 34 ) {
        return 'cloudy'

    } else if (AccuweathericonTheme === 35) {
        return 'cloudy'

    } else if (AccuweathericonTheme === 36) {
        return 'cloudy'

    } else if (AccuweathericonTheme === 37) {
        return 'fog'

    } else if (AccuweathericonTheme === 38) {
        return 'cloudy'

    } else if (AccuweathericonTheme === 39 ) {
        return 'rain'

    } else if (AccuweathericonTheme === 40) {
        return 'rain'

    } else if (AccuweathericonTheme === 41) {
        return 'thunder'

    } else if (AccuweathericonTheme === 42) {
        return 'thunder'

    } else if (AccuweathericonTheme === 43) {
        return 'snow'

    } else if (AccuweathericonTheme === 44) {
        return 'snow'

    }

return AccuweathericonTheme
}


// accu weather frog

function GetWeatherIconAccuFrog(AccuweathericonFrog) {


    if (AccuweathericonFrog === 1) {
        return sunnyFrog[Math.floor(Math.random() * sunnyFrog.length)];

    } else if (AccuweathericonFrog === 2) {
        return mostlySunnyFrog[Math.floor(Math.random() * mostlySunnyFrog.length)];

    } else if (AccuweathericonFrog === 3 || AccuweathericonFrog === 4) {
        return PartlyCloudyFrog[Math.floor(Math.random() * PartlyCloudyFrog.length)];

    } else if (AccuweathericonFrog === 5) {
        return FogFrog[Math.floor(Math.random() * FogFrog.length)];

    } else if (AccuweathericonFrog === 6) {
        return PartlyCloudyFrog[Math.floor(Math.random() * PartlyCloudyFrog.length)];

    } else if (AccuweathericonFrog === 7) {
        return OvercastFrog[Math.floor(Math.random() * OvercastFrog.length)];

    } else if (AccuweathericonFrog === 8) {
        return OvercastFrog[Math.floor(Math.random() * OvercastFrog.length)];

    } else if (AccuweathericonFrog === 11) {
        return FogFrog[Math.floor(Math.random() * FogFrog.length)];

    } else if (AccuweathericonFrog === 12) {
        return RainFrog[Math.floor(Math.random() * RainFrog.length)];

    } else if (AccuweathericonFrog === 13) {
        return RainFrog[Math.floor(Math.random() * RainFrog.length)];

    } else if (AccuweathericonFrog === 14) {
        return RainFrog[Math.floor(Math.random() * RainFrog.length)];

    } else if (AccuweathericonFrog === 15) {
        return ThunderStormFrog[Math.floor(Math.random() * ThunderStormFrog.length)];

    } else if (AccuweathericonFrog === 16) {
        return ThunderStormFrog[Math.floor(Math.random() * ThunderStormFrog.length)];

    } else if (AccuweathericonFrog === 17) {
        return ThunderStormFrog[Math.floor(Math.random() * ThunderStormFrog.length)];

    } else if (AccuweathericonFrog === 18) {
        return RainFrog[Math.floor(Math.random() * RainFrog.length)];

    } else if (AccuweathericonFrog === 19) {
        return SnowFrog[Math.floor(Math.random() * SnowFrog.length)];

    } else if (AccuweathericonFrog === 20) {
        return SnowFrog[Math.floor(Math.random() * SnowFrog.length)];

    } else if (AccuweathericonFrog === 21) {
        return SnowFrog[Math.floor(Math.random() * SnowFrog.length)];

    } else if (AccuweathericonFrog === 22) {
        return SnowFrog[Math.floor(Math.random() * SnowFrog.length)];

    } else if (AccuweathericonFrog === 23) {
        return SnowFrog[Math.floor(Math.random() * SnowFrog.length)];

    } else if (AccuweathericonFrog === 24) {
        return SnowFrog[Math.floor(Math.random() * SnowFrog.length)];

    } else if (AccuweathericonFrog === 25) {
        return SnowFrog[Math.floor(Math.random() * SnowFrog.length)];

    } else if (AccuweathericonFrog === 26) {
        return SnowFrog[Math.floor(Math.random() * SnowFrog.length)];

    } else if (AccuweathericonFrog === 29) {
        return SnowFrog[Math.floor(Math.random() * SnowFrog.length)];

    }
   else if (AccuweathericonFrog === 30) {
        return sunnyFrog[Math.floor(Math.random() * sunnyFrog.length)];

    } else if (AccuweathericonFrog === 31) {
        return ClearNightFrog[Math.floor(Math.random() * ClearNightFrog.length)];

    } else if (AccuweathericonFrog === 32) {
        return OvercastFrog[Math.floor(Math.random() * OvercastFrog.length)];

    } else if (AccuweathericonFrog === 33) {
        return ClearNightFrog[Math.floor(Math.random() * ClearNightFrog.length)];

    } else if (AccuweathericonFrog === 34 ) {
        return PartlyCloudyNightFrog[Math.floor(Math.random() * PartlyCloudyNightFrog.length)];

    } else if (AccuweathericonFrog === 35) {
        return PartlyCloudyNightFrog[Math.floor(Math.random() * PartlyCloudyNightFrog.length)];

    } else if (AccuweathericonFrog === 36) {
        return PartlyCloudyNightFrog[Math.floor(Math.random() * PartlyCloudyNightFrog.length)];

    } else if (AccuweathericonFrog === 37) {
        return FogFrog[Math.floor(Math.random() * FogFrog.length)];

    } else if (AccuweathericonFrog === 38) {
        return PartlyCloudyNightFrog[Math.floor(Math.random() * PartlyCloudyNightFrog.length)];

    } else if (AccuweathericonFrog === 39 ) {
        return RainFrog[Math.floor(Math.random() * RainFrog.length)];

    } else if (AccuweathericonFrog === 40) {
        return RainFrog[Math.floor(Math.random() * RainFrog.length)];

    } else if (AccuweathericonFrog === 41) {
        return ThunderStormFrog[Math.floor(Math.random() * ThunderStormFrog.length)];

    } else if (AccuweathericonFrog === 42) {
        return ThunderStormFrog[Math.floor(Math.random() * ThunderStormFrog.length)];

    } else if (AccuweathericonFrog === 43) {
        return SnowFrog[Math.floor(Math.random() * SnowFrog.length)];

    } else if (AccuweathericonFrog === 44) {
        return SnowFrog[Math.floor(Math.random() * SnowFrog.length)];

    }

return AccuweathericonFrog
}


// labels without animations


function GetWeatherTextAccuNoAnim(iconCodeAccu) {


        if (iconCodeAccu === 1) {
            return 'Sunny'

        } else if (iconCodeAccu === 2) {
            return 'Mostly Sunny'

        } else if (iconCodeAccu === 3 || iconCodeAccu === 4) {
            return 'Partly Sunny'

        } else if (iconCodeAccu === 5) {
            return 'Hazy Sunshine'

        } else if (iconCodeAccu === 6) {
            return 'Mostly Cloudy'

        } else if (iconCodeAccu === 7) {
            return 'Cloudy'

        } else if (iconCodeAccu === 8) {
            return 'Overcast'

        } else if (iconCodeAccu === 11) {
            return 'Fog'

        } else if (iconCodeAccu === 12) {
            return 'Showers'

        } else if (iconCodeAccu === 13) {
            return 'Light rain'

        } else if (iconCodeAccu === 14) {
            return 'Rainy'

        } else if (iconCodeAccu === 15) {
            return 'T-Storms'

        } else if (iconCodeAccu === 16) {
            return 'Cloudy / T-Storms'

        } else if (iconCodeAccu === 17) {
            return 'Sunny / T-Storms'

        } else if (iconCodeAccu === 18) {
            return 'Rain'

        } else if (iconCodeAccu === 19) {
            return 'Flurries'

        } else if (iconCodeAccu === 20) {
            return 'Moderate Flurries'

        } else if (iconCodeAccu === 21) {

            return 'Slight Flurries'

        } else if (iconCodeAccu === 22) {
            return 'Snow'

        } else if (iconCodeAccu === 23) {
            return 'Cloudy / snow'

        } else if (iconCodeAccu === 24) {
            return 'Ice'

        } else if (iconCodeAccu === 25) {
            return 'Sleet'

        } else if (iconCodeAccu === 26) {
            return 'Freezing Rain'

        } else if (iconCodeAccu === 29) {
            return 'Rain and Snow'

        }
       else if (iconCodeAccu === 30) {
            return 'Hot'

        } else if (iconCodeAccu === 31) {

            return 'Cold'

        } else if (iconCodeAccu === 32) {
            return 'Windy'

        } else if (iconCodeAccu === 33) {
            return 'Clear'

        } else if (iconCodeAccu === 34 ) {
            return 'Mostly Clear'

        } else if (iconCodeAccu === 35) {
            return 'Partly Cloudy'

        } else if (iconCodeAccu === 36) {
            return 'Intermittent Clouds'

        } else if (iconCodeAccu === 37) {

            return 'Hazy Moonlight'

        } else if (iconCodeAccu === 38) {

            return 'Mostly Cloudy'

        } else if (iconCodeAccu === 39 ) {
            return 'Light rain'

        } else if (iconCodeAccu === 40) {
            return 'Rainy'

        } else if (iconCodeAccu === 41) {
            return 'Light T-storms'

        } else if (iconCodeAccu === 42) {
            return 'Light T-storms'

        } else if (iconCodeAccu === 43) {
            return 'Light flurries'

        } else if (iconCodeAccu === 44) {
            return 'Light snow'

        }

    return 'Error'
}