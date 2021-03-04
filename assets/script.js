var btnSearchCity = $("#btn-Search");
var inputCity = $("#input-City");
var city = '';
var citySearch = [];
var apiKey = '835282ba86a36f7e194cf25a643b8a9c';
var cityName = $("currentCity-Name");
var currentTemp = $("#current-Temp");
var currentHum = $("#current-Hum");
var currentWind= $("#current-Wind");
var currentUvi= $("#current-UVI");

// Url to search cities
var cityURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=imperial';

//URL to get uvindex
//var uvURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + apiKey + '&lat=' + lt + '&lon=' + ln;

//URL to get 5day forecast
//var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityID + '&appid=' + apiKey + '&units=imperial';

// Start Btn
$("#btn-Search").click(function(event){
    event.preventDefault();
    var city = inputCity.val().trim(); 
    currentWeather();
    $("#input-City").val("");
    console.log(city);        
});

function storeCity() {
    $("ul").empty();
var storedCity = JSON.parse(localStorage.getItem("citySearch"))
if (storedCity !== null) {
    citySearch = storedCity;
};
    // list up to 10
    for (i = 0; i < citySearch.length; i++) {
        if (i == 10) {
            break;
        }
       // listCities = $()
    }
}


/******************************************************** */
function currentWeather(){
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=imperial',
       type: "GET"
    })
   // fetch(cityURL)
    .then(function(response){
        // return response.json();
        var date = moment().format("MM/DD/YYYY");
        var weatherIcon = response.weather[0].icon;
    })
    
}
