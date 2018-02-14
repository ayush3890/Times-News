var lat = "";
var lon = "";

function getLocation() {
     navigator.geolocation.getCurrentPosition(showPosition);
}

async function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    var url =   'http://api.openweathermap.org/data/2.5/forecast?lang=en&' +
            'lat=' + lat + '&' +
            'lon=' + lon + '&' +
            'APPID=' + '4352d58b4b05214fcbabc9781356b2ce';
    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            updatePage(data);
        }).then(function() {
            document.querySelector('.weatherBar').style.opacity = 1;
        });
}

async function updatePage(data) {
    await updateMainTempTag(data);
    await updateMiniWeather(data);
    await updateWeaklyTemp(data);
    await updateExtraBar(data);
}

function updateMainTempTag(data) {
    var place       = document.querySelector('.place');
    var temprature  = document.querySelector('.temprature');
    var weatherType =  document.querySelector('.weatherType');

    var temp = data.list[0].main.temp - 273.15;
    var prefix = 'wi wi-';
    var code   = data.list[0].weather[0].id;
    var icon = weatherIcons[code].icon;

    place.textContent = data.city.name;
    weatherType.textContent = weatherIcons[code].label;
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon;
    }

    icon = prefix + icon + '';
    temp = temp.toFixed(2);
    temprature.innerHTML = temp + ' <i class="wi wi-celsius"></i>';
}

function updateMiniWeather(data) {
    for(var i = 0; i < 8; i++) {
        var element = data.list[i];
        var weatherToday = document.querySelector('.weatherToday');
        var miniWeather = document.createElement('div');
        var miniWTime   = document.createElement('p');
        var miniWampm   = document.createElement('p');
        var miniWIcon   = document.createElement('i');
        var miniWTemp   = document.createElement('p');

        miniWeather.classList.add('miniWeather', 'ele');
        miniWTime.classList.add('miniWeatherEle');
        miniWIcon.classList.add('miniWeatherEle');
        miniWTemp.classList.add('miniWeatherEle');
        miniWampm.classList.add('miniWeatherEle');

        weatherToday.appendChild(miniWeather);
        miniWeather.appendChild(miniWTime);
        miniWeather.appendChild(miniWampm);
        miniWeather.appendChild(miniWIcon);
        miniWeather.appendChild(miniWTemp);

        var time = element.dt_txt.slice(11,13);
        if(time > 12) {
            time = time % 12;
            miniWampm.textContent = 'P.M.';
        } else {
            time = parseInt(time);
            miniWampm.textContent = 'A.M.';
        }
        miniWTime.textContent = time;

        var temp = element.main.temp - 273.15;
        var prefix = 'wi wi-';
        var code   = element.weather[0].id;
        var icon = weatherIcons[code].icon;

        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }

        icon = prefix + icon + '';
        temp = temp.toFixed(1);
        miniWIcon.innerHTML ='<i class="' + icon + '"></i>';
        miniWTemp.innerHTML = temp + ' <i class="wi wi-celsius"></i>';;
    }
}

function updateWeaklyTemp(data) {
    var weaklyTempArr = [];
    for(let i = 0; i < data.list.length; i++) {
        let listEl = data.list[i];
        let dt = listEl.dt_txt.slice(10,13);
        if(dt == 9) {
            weaklyTempArr.push(listEl);
        }
    }
    var weaklyTempPage = document.querySelector('.weaklyTemp');
    for(let j = 0; j < weaklyTempArr.length; j++) {
        var element = weaklyTempArr[j];

        var weaklyBar = document.createElement('div');

        var weaklyDay = document.createElement('p');
        var weaklyTemp = document.createElement('div');
        var weaklyIcon = document.createElement('i');

        weaklyBar.appendChild(weaklyDay);
        weaklyBar.appendChild(weaklyIcon);
        weaklyBar.appendChild(weaklyTemp);

        var weaklyTempMin = document.createElement('p');
        var weaklyTempMax = document.createElement('p');

        weaklyTemp.appendChild(weaklyTempMax);
        weaklyTemp.appendChild(weaklyTempMin);

        var date = new Date(element.dt_txt);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        weaklyDay.textContent = days[date.getDay()];
        var prefix = 'wi wi-';
        var code   = element.weather[0].id;
        var icon = weatherIcons[code].icon;
        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }
        icon = prefix + icon + '';
        weaklyIcon.innerHTML ='<i class="' + icon + '"></i>';
        weaklyTempMax.textContent = (element.main.temp_max - 273.15).toFixed(2);
        weaklyTempMin.textContent = (element.main.temp_min - 273.15).toFixed(2);

        weaklyTempPage.appendChild(weaklyBar);



        weaklyDay.classList.add('weaklyDay');
        weaklyTemp.classList.add('weaklyTempTemp');
        weaklyBar.classList.add('weaklyBar', 'ele');
        weaklyIcon.classList.add('weaklyIcon');
    }
}

function updateExtraBar(data) {
    var element = data.list[0];
    var windDirec = document.querySelector('.windDirec');
    var windSpeed = document.querySelector('.windSpeed');
    var groundLvl = document.querySelector('.groundLvl');
    var humidity = document.querySelector('.humidity');
    var pressure = document.querySelector('.pressure');
    var seaLvl = document.querySelector('.seaLvl');

    windDirec.innerHTML =
        '<i class="wi wi-wind-direction"></i>' +
        '<p>' + element.wind.deg +' deg</p>';

    windSpeed.innerHTML =
        '<i class="wi wi-strong-wind"></i>' +
        '<p>' + element.wind.speed +' m/s</p>';

    groundLvl.innerHTML =
        '<i class="wi wi-na"></i>' +
        '<p>' + element.main.grnd_level +' hPa</p>';

    humidity.innerHTML =
        '<i class="wi wi-humidity"></i>' +
        '<p>' + element.main.humidity +' %</p>';

    pressure.innerHTML =
        '<i class="wi wi-barometer"></i>' +
        '<p>' + element.main.pressure +' hPa</p>';

    seaLvl.innerHTML =
        '<i class="wi wi-thermometer-exterior"></i>' +
        '<p>' + element.main.sea_level +' hPa</p>';
}

getLocation();

var weatherIcons = {
                        "200": {
                        "label": "thunderstorm with light rain",
                            "icon": "storm-showers"
                    },

                        "201": {
                        "label": "thunderstorm with rain",
                            "icon": "storm-showers"
                    },

                        "202": {
                        "label": "thunderstorm with heavy rain",
                            "icon": "storm-showers"
                    },

                        "210": {
                        "label": "light thunderstorm",
                            "icon": "storm-showers"
                    },

                        "211": {
                        "label": "thunderstorm",
                            "icon": "thunderstorm"
                    },

                        "212": {
                        "label": "heavy thunderstorm",
                            "icon": "thunderstorm"
                    },

                        "221": {
                        "label": "ragged thunderstorm",
                            "icon": "thunderstorm"
                    },

                        "230": {
                        "label": "thunderstorm with light drizzle",
                            "icon": "storm-showers"
                    },

                        "231": {
                        "label": "thunderstorm with drizzle",
                            "icon": "storm-showers"
                    },

                        "232": {
                        "label": "thunderstorm with heavy drizzle",
                            "icon": "storm-showers"
                    },

                        "300": {
                        "label": "light intensity drizzle",
                            "icon": "sprinkle"
                    },

                        "301": {
                        "label": "drizzle",
                            "icon": "sprinkle"
                    },

                        "302": {
                        "label": "heavy intensity drizzle",
                            "icon": "sprinkle"
                    },

                        "310": {
                        "label": "light intensity drizzle rain",
                            "icon": "sprinkle"
                    },

                        "311": {
                        "label": "drizzle rain",
                            "icon": "sprinkle"
                    },

                        "312": {
                        "label": "heavy intensity drizzle rain",
                            "icon": "sprinkle"
                    },

                        "313": {
                        "label": "shower rain and drizzle",
                            "icon": "sprinkle"
                    },

                        "314": {
                        "label": "heavy shower rain and drizzle",
                            "icon": "sprinkle"
                    },

                        "321": {
                        "label": "shower drizzle",
                            "icon": "sprinkle"
                    },

                        "500": {
                        "label": "light rain",
                            "icon": "rain"
                    },

                        "501": {
                        "label": "moderate rain",
                            "icon": "rain"
                    },

                        "502": {
                        "label": "heavy intensity rain",
                            "icon": "rain"
                    },

                        "503": {
                        "label": "very heavy rain",
                            "icon": "rain"
                    },

                        "504": {
                        "label": "extreme rain",
                            "icon": "rain"
                    },

                        "511": {
                        "label": "freezing rain",
                            "icon": "rain-mix"
                    },

                        "520": {
                        "label": "light intensity shower rain",
                            "icon": "showers"
                    },

                        "521": {
                        "label": "shower rain",
                            "icon": "showers"
                    },

                        "522": {
                        "label": "heavy intensity shower rain",
                            "icon": "showers"
                    },

                        "531": {
                        "label": "ragged shower rain",
                            "icon": "showers"
                    },

                        "600": {
                        "label": "light snow",
                            "icon": "snow"
                    },

                        "601": {
                        "label": "snow",
                            "icon": "snow"
                    },

                        "602": {
                        "label": "heavy snow",
                            "icon": "snow"
                    },

                        "611": {
                        "label": "sleet",
                            "icon": "sleet"
                    },

                        "612": {
                        "label": "shower sleet",
                            "icon": "sleet"
                    },

                        "615": {
                        "label": "light rain and snow",
                            "icon": "rain-mix"
                    },

                        "616": {
                        "label": "rain and snow",
                            "icon": "rain-mix"
                    },

                        "620": {
                        "label": "light shower snow",
                            "icon": "rain-mix"
                    },

                        "621": {
                        "label": "shower snow",
                            "icon": "rain-mix"
                    },

                        "622": {
                        "label": "heavy shower snow",
                            "icon": "rain-mix"
                    },

                        "701": {
                        "label": "mist",
                            "icon": "sprinkle"
                    },

                        "711": {
                        "label": "smoke",
                            "icon": "smoke"
                    },

                        "721": {
                        "label": "haze",
                            "icon": "day-haze"
                    },

                        "731": {
                        "label": "sand, dust whirls",
                            "icon": "cloudy-gusts"
                    },

                        "741": {
                        "label": "fog",
                            "icon": "fog"
                    },

                        "751": {
                        "label": "sand",
                            "icon": "cloudy-gusts"
                    },

                        "761": {
                        "label": "dust",
                            "icon": "dust"
                    },

                        "762": {
                        "label": "volcanic ash",
                            "icon": "smog"
                    },

                        "771": {
                        "label": "squalls",
                            "icon": "day-windy"
                    },

                        "781": {
                        "label": "tornado",
                            "icon": "tornado"
                    },

                        "800": {
                        "label": "clear sky",
                            "icon": "sunny"
                    },

                        "801": {
                        "label": "few clouds",
                            "icon": "cloudy"
                    },

                        "802": {
                        "label": "scattered clouds",
                            "icon": "cloudy"
                    },

                        "803": {
                        "label": "broken clouds",
                            "icon": "cloudy"
                    },

                        "804": {
                        "label": "overcast clouds",
                            "icon": "cloudy"
                    },


                        "900": {
                        "label": "tornado",
                            "icon": "tornado"
                    },

                        "901": {
                        "label": "tropical storm",
                            "icon": "hurricane"
                    },

                        "902": {
                        "label": "hurricane",
                            "icon": "hurricane"
                    },

                        "903": {
                        "label": "cold",
                            "icon": "snowflake-cold"
                    },

                        "904": {
                        "label": "hot",
                            "icon": "hot"
                    },

                        "905": {
                        "label": "windy",
                            "icon": "windy"
                    },

                        "906": {
                        "label": "hail",
                            "icon": "hail"
                    },

                        "951": {
                        "label": "calm",
                            "icon": "sunny"
                    },

                        "952": {
                        "label": "light breeze",
                            "icon": "cloudy-gusts"
                    },

                        "953": {
                        "label": "gentle breeze",
                            "icon": "cloudy-gusts"
                    },

                        "954": {
                        "label": "moderate breeze",
                            "icon": "cloudy-gusts"
                    },

                        "955": {
                        "label": "fresh breeze",
                            "icon": "cloudy-gusts"
                    },

                        "956": {
                        "label": "strong breeze",
                            "icon": "cloudy-gusts"
                    },

                        "957": {
                        "label": "high wind, near gale",
                            "icon": "cloudy-gusts"
                    },

                        "958": {
                        "label": "gale",
                            "icon": "cloudy-gusts"
                    },

                        "959": {
                        "label": "severe gale",
                            "icon": "cloudy-gusts"
                    },

                        "960": {
                        "label": "storm",
                            "icon": "thunderstorm"
                    },

                        "961": {
                        "label": "violent storm",
                            "icon": "thunderstorm"
                    },

                        "962": {
                        "label": "hurricane",
                            "icon": "cloudy-gusts"
                    }
};