 const API = "67be690db918f2a4a5fff60aa22770eb",
  currentWeatherItemsEl = document.getElementById("current-weather"),
  timeZoneEL = document.getElementById("time-zone"),
  countryEL = document.getElementById("country"),
  weeklyForcastEl = document.getElementById("weekly-forcast"),
  currentTempEl = document.getElementById("current-temp"),
  inputField = document.querySelector("input"),
  loactionBtn = document.querySelector("button"),
  textError = document.querySelector(".error-text"),
  errContainer = document.querySelector(".error-container"),
  container = document.querySelector(".container"),
  weatherIcon = document.querySelector(".icon"),
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

// fetching data for city......
function requestApi(city) {
  console.log(city);
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`;
  fetchData();
}

// fetching data for current location......
loactionBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser does not support geoloaction api");
  }
});

function onSuccess(position) {
  // console.log(position);
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API}`;
  fetchData();
}

// error if occur
function onError(error) {
  //  console.log(error)
  textError.innerText = error.message;
  textError.classList.add("error");
}

// function to fetch api
function fetchData() {
  textError.innerText = "Geeting weather info. Please wait...";
  textError.classList.add("wait");
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
  textError.classList.replace("wait", "error");
  if (info.cod == "404") {
    textError.innerText = `"${inputField.value}" isn't a valid city name`;
  } else {
    const city = info.name,
      timezone = info.timezone,
      { country } = info.sys,
      { description, icon } = info.weather[0],
      { feels_like, humidity, pressure, temp, temp_max, temp_min } = info.main,
      visibility = info.visibility,
      speed = info.wind;

    container.querySelector(".place .time-zone").innerText = city;
    container.querySelector(".place .country").innerText =  country;
    container.querySelector("#min-temp").innerText = temp_min;
    container.querySelector("#max_temp"), (innerText = temp_max);
    container.querySelector("#humidity"), (innerText = humidity);
    container.querySelector("#wind-speed"), (innerText = speed);
    container.querySelector("#pressure"), (innerText = pressure);
    container.querySelector("#visibility").innerText = visibility;
    container.querySelector(
      ".weather-condition-container .description"
    ).innerText = description;
    container.querySelector(
      ".weather-condition-container .condition span"
    ).innerText = temp;
    container.querySelector(
      ".weather-condition-container .feels-like span"
    ).innerText = feels_like;

    let iconImg = document.createElement("img");
    iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    iconImg.alt = "weather-icon";
    weatherIcon.appendChild(iconImg);

    textError.classList.remove("wait", "error");
    container.classList.add("active");
    console.log(info);
    console.log(timezone);

    function dispalyTime() {
      let utcHours = timezone / 360 / 10;
      // Getting time according to city timezone
      const d = new Date();
      const localTime = d.getTime();
      const localOffset = d.getTimezoneOffset() * 60000;

      const utc = localTime + localOffset;
      const getTime = utc + 3600000 * utcHours;

      const getTimeNow = new Date(getTime);
      const hrs = getTimeNow.getHours();
      const min = getTimeNow.getMinutes();

      const month = getTimeNow.getMonth();
      const date = getTimeNow.getDate();
      const day = getTimeNow.getDay();

      document.getElementById("day").innerHTML = days[day];
      document.getElementById("month").innerHTML = months[month];
      document.getElementById("date-today").innerHTML = date;

    
      if (min < 10) {
        document.getElementById("minutes").innerHTML = "0" + min;
      } else {
        document.getElementById("minutes").innerHTML = min;
      }

      if (hrs < 10) {
        document.getElementById("hours").innerHTML = "0" + hrs;
      } else {
        document.getElementById("hours").innerHTML = hrs;
      }
      console.log(description)
      switch (description) {
        case "clear sky":
          document.body.style.background = "url(https://images.pond5.com/clear-sky-cloud-footage-081114452_iconl.jpeg)";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          break;
        case "cloudy":
          document.body.style.background = "url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Cloudy_sky_%2826171935906%29.jpg/1200px-Cloudy_sky_%2826171935906%29.jpg)";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
     
          break;
        case "broken clouds":
          document.body.style.background = "url(https://images.freeimages.com/images/large-previews/e83/broken-clouds-1537880.jpg)";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
      
          break;
    
        case "rain":
          document.body.style.background = "url(https://miro.medium.com/max/1400/1*OSBo6euKrh4TwdSchg_Yhw.jpeg)";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
      
          break;
        case "shower rain" :
          document.body.style.background = "url(https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/rain-drops-on-window-1827098_1920.jpg?strip=1)";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          break;
        case "thunderstrome":
          document.body.style.background = "url(https://images.immediate.co.uk/production/volatile/sites/4/2020/08/GettyImages-NA006117-b5eac24.jpg)";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          break;
        case "snow":
          document.body.style.background = "url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Verschneiter_Waldweg_am_Bonstapel_in_Vlotho.jpg/1200px-Verschneiter_Waldweg_am_Bonstapel_in_Vlotho.jpg)";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          break;
        case "mist":
          document.body.style.background = "url(https://www.advancednanotechnologies.com/wp-content/uploads/2019/05/iStock-1055906130-1080x675.jpg)";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          break;
        case "haze":
          document.body.style.background = "url(https://cff2.earth.com/uploads/2018/11/13015448/what-is-haze-960x640.jpg)";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          break;
        default : 
        document.body.style.background = "url(https://scied.ucar.edu/sites/default/files/media/images/weather_0.jpg)";
        document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
    }
  }
    setInterval(dispalyTime, 100);
  }
}

