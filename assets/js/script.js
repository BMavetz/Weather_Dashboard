var apiKey = '&appid=8710c92cc91b2be9b69b111ac287d778';
var currWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
var allWeather = ('')
var citySearch = $("#city");
var Search = $("#searchButton");
var curDate = moment().format('l');
var lat;
var lon;
console.log(curDate);
$(".futWeath").width('19%');
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
})  };

Search.on('click',getCurWeather);
