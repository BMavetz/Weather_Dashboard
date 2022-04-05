var apiKey = '&appid=8710c92cc91b2be9b69b111ac287d778';
var currWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
var city = $('#city');
var Search = $('#searchButton');
var curDate = moment().format('l');
var histList = $('#searchHist')
var citySearch;
var lat;
var lon;

$(".futWeath").width('19%');


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
      
      lat = data.coord.lat;
      lon = data.coord.lon;
   
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
            
      var iconCode = data.current.weather[0].icon;
      weatherImg.attr('src', 'http://openweathermap.org/img/wn/' + iconCode +'@2x.png');
      $('#cityInfo').append(weatherImg);
        $('#curTemp').text('Temp: ' + data.current.temp + ' \u00B0F');
        $('#curWind').text('Wind: ' + data.current.wind_speed + ' MPH');
        $('#curHumidity').text('Humidity: ' + data.current.humidity + ' %');
        $('#curUVI').text('UV Index: ' + data.current.uvi);
        if (data.current.uvi < 3) {
            $('#curUVI').css('background-color', 'green');        
        }else if (data.current.uvi > 5) {
            $('#curUVI').css('background-color', 'red');
        }else{
            $('#curUVI').css('background-color', 'yellow');
        }
        for(var i = 0; i < 5 ; i++){
            iconCode = data.daily[i].weather[0].icon;
        $('#weatherForecast').children().eq(i).children().eq(0).children().eq(1).children('img').attr('src', 'http://openweathermap.org/img/wn/' + iconCode +'@2x.png');
        $('#weatherForecast').children().eq(i).children().eq(0).children().eq(1).children('#futTemp').text('Temp: ' + data.daily[i].temp.day + ' \u00B0F');
        $('#weatherForecast').children().eq(i).children().eq(0).children().eq(1).children('#futWind').text('Wind: ' + data.daily[i].wind_speed + ' MPH');
        $('#weatherForecast').children().eq(i).children().eq(0).children().eq(1).children('#futHumidity').text('Humidity: ' + data.daily[i].wind_speed + ' %');
        }
    })
};

function searchHistory(){
    var cityName = citySearch.val();
    var histLink = $('<button>');
     histLink.val(cityName);
     histLink.text(cityName);
    histLink.addClass('search-history');
    histList.append(histLink);
};


$('#searchHist').on('click', '.search-history', function (event){
    
    citySearch.val($(event.target).val());
    getCurWeather();
}
);
Search.on('click',function(){
citySearch = city;
getCurWeather();
searchHistory();
})
