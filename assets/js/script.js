var apiKey = '&appid=8710c92cc91b2be9b69b111ac287d778';
var currWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
var citySearch;
var Search = $('#searchButton');
var curDate = moment().format('l');
var histList = $('#searchHist');
var favList = [];
var clear = $('#clearHist');
var lat;
var lon;

$(".futWeath").width('19%');
getHistory();

function getCurWeather () {
    $('#city').val('');
    // console.log(citySearch.val());
    var requestURL = (currWeather + citySearch + apiKey + '&units=imperial');
    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if(data.cod == '404'){
            $('#cityInfo').text('City name not recognized.  Please enter a valid city name into the input');
            clearAll();   
        }
        else{
          $('#cityInfo').text(citySearch + ' (' + curDate + ')');
          for(var i = 0; i < 5 ; i++){
              var dayIndex = i+1;
              var futureDate = moment().add(dayIndex, 'days').format('l');
              $('#weatherForecast').children().eq(i).children().eq(0).children('h3').text(futureDate);
              }
        lat = data.coord.lat;
        lon = data.coord.lon;
        toLocalStorage();
        getWeatherForecast();
      }
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

//possibly add a cutoff of 10 items using if statement
function toLocalStorage(){
    if(!favList.includes(citySearch)){
        favList.push(citySearch);
        console.log(favList);
        localStorage.setItem("cityFavorites", JSON.stringify(favList));
        renderHistory();
    }
}

function getHistory(){
    var favs = JSON.parse(localStorage.getItem("cityFavorites"));
    if (favs !== null){
        favList = favs
    }
    renderHistory();
}

function renderHistory(){
    histList.children('a').remove();
    histList.innerHTML = "";
    for(var i = 0; i < favList.length; i++){
    var favContent =favList[i];
    var histLink = $('<a>');
    histLink.attr('href','');
    histLink.attr('city-history', favContent);
     histLink.text(favContent);
    // histLink.addClass('search-history');
    histList.append(histLink);
    }
};

function clearAll() {
    $('.currWeather').children('p').text('');
    for(var i = 0; i < 5 ; i++){
    $('#weatherForecast').children().eq(i).children().eq(0).children('h3').text('');
    $('#weatherForecast').children().eq(i).children().eq(0).children().eq(1).children('img').attr('src','');
    $('#weatherForecast').children().eq(i).children().eq(0).children().eq(1).children('#futTemp').text('');
    $('#weatherForecast').children().eq(i).children().eq(0).children().eq(1).children('#futWind').text('');
    $('#weatherForecast').children().eq(i).children().eq(0).children().eq(1).children('#futHumidity').text('');
    }
}


histList.on('click', function (event){
    event.preventDefault();
    var element = $(event.target);
    citySearch = element.attr('city-history');
    getCurWeather();
});

clear.on('click', function(event){
    event.preventDefault();
    favList = [];
    localStorage.setItem("cityFavorites", JSON.stringify(favList));
    renderHistory();
});

Search.on('click',function(){
citySearch = $('#city').val();
if(citySearch == ''){
    $('#cityInfo').text('Please enter a city into the search bar');
    clearAll();
}else{
    getCurWeather();
}
});
