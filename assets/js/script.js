var apiKey = '&appid=8710c92cc91b2be9b69b111ac287d778';
var currWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
var citySearch = $("#city");
var Search = $("#searchButton");
var curDate = moment().format('l');
var lat;
var lon;
console.log(curDate);
$(".futWeath").width('19%');
console.log('\u00B0F');
//get weather
    //use current weather api to return weather data
    //execute weather data based on city name from input section
    //log weather data in current weather box
    //store lat and long values
//get future weather
    //call lat and lon values to get weather forecast
    //display 'hide' for forecast boxes until search is executed
    //take .child parameter of forecast section of code, and assign the future weather data
//save cities in local storage, generate list of previous searches below search form on page
    //assign link value, can click on link
    //link generates function that uses value associated with link to input into the url to pull up the weather data (reference hw activity from unit 5 with keyboard for logic)
function getCurWeather () {
    $('#cityInfo').text(citySearch.val() + ' (' + curDate + ')');
    for(var i = 0; i < 5 ; i++){
        var dayIndex = i+1;
        var futureDate = moment().add(dayIndex, 'days').format('l');
        $('#weatherForecast').children().eq(i).children().eq(0).children('h3').text(futureDate);
        }
    // console.log(citySearch.val());
    var requestURL = (currWeather + citySearch.val() + apiKey + '&units=imperial');
    fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data.coord.lat;
      lon = data.coord.lon;
    //   console.log(currWeather + lon);
    //   console.log(data.coord.lat);
    getWeatherForecast();
    })  
};

function getWeatherForecast () {
    var weatherImg = $('<img>');
    var requestURL = ('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts' + apiKey + '&units=imperial');
    fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      weatherImg.attr('src', 'http://openweathermap.org/img/wn/10d@2x.png' );
      $('#cityInfo').append(weatherImg);
        // var curWeathIcon = data.current.weather[0].icon;
        // $('#cityInfo').attr
        $('#curTemp').text('Temp: ' + data.current.temp + ' \u00B0F');
        $('#curWind').text('Wind: ' + data.current.wind_speed + ' MPH');
        $('#curHumidity').text('Humidity: ' + data.current.humidity + ' %');
        $('#curUVI').text('UV Index: ' + data.current.uvi);



    })
};

Search.on('click',getCurWeather);
