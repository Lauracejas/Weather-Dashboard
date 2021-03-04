var btnSearchCity = $("#btn-Search");
var inputCity = $("#input-City");
var city = '';
var citySearch = [];
var apiKey = '835282ba86a36f7e194cf25a643b8a9c';
var cityName = $("#currentCity-Name");
var currentTemp = $("#current-Temp");
var currentHum = $("#current-Hum");
var currentWind = $("#current-Wind");
var currentUvi = $("#current-UVI");
var listSearchCity = $("#list-Cities");

/******Add city you search to the list********/
function showList(event) {
    event.preventDefault();
    var listCities = $("#input-City").val();
    var cityPut = $("<li>");
    cityPut.text(listCities);
    listSearchCity.append(cityPut);

}

/*********Store city name in local storage*********/
var storedCity = JSON.parse(localStorage.getItem("storedCity")) || [];

function storeCity() {
    var city = inputCity.val().trim();
    storedCity.push(city);
    localStorage.setItem("storedCity", JSON.stringify(storedCity));


}
/***********Show current weather in the Main Car***************/

function currentWeather(city) {
    var cityURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=imperial';
    fetch(cityURL)
        .then(function (response) {
            //console.log(response);
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            var date = moment().format("MM/DD/YYYY");
            console.log(date);
            var weatherIcon = response.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            cityName.html(response.name + "(" + date + ")" + "<img src=" + iconURL + ">");            
            currentTemp.html("Temperature: " + response.main.temp + " &#8457 ");            
            currentHum.html(response.main.humidity + "%");            
            currentWind.html(response.wind.speed + "MPH");
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            getUV(lat, lon);

        })
}

 function getUV(lat, lon) {
    var uvURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + apiKey + '&lat=' + lat + '&lon=' + lon;
    fetch(uvURL)
        .then(function (response) {
            return response.json()
        })
        .then(function(response){
            console.log(response);
            currentUvi.html(response.value);
            
        });
 }

/********************5-Day Forecast********************************/
// function forecast(city) {
//     var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey + '&units=imperial';
//     fetch(forecastURL)
//         .then(function (response) {
//             // console.log(response);
//             $("#forecast-cards").html('<h5 class="card-title">5-Day Forecast</h5>');
//             for (var i = 0; i < 5; i++) {

//                 var col = $("<div>").addClass("row col-sm-3");
//                 var card = $("<div>").addClass("card bg-primary text-white ml-2 mb-2 rounded");
//                 var body = $("<div>").addClass("card-body p-2");
//                 var title = $("<div>").addClass("card-title").text(new Date(response.list[i].dt).toLocaleDateString());
//                 var iconcode = response.list[i].weather[0].icon;
//                 var iconUrl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
//                 var iconImage = $("<div>").addClass("icone").html("<img src=" + iconUrl + ">");
//                 var tempCard = $("<p>").addClass("card-text").html("Temp: " + response.list[i].main.temp + "&#8457");
//                 var humidCard = $("<p>").addClass("humidity").html("Humidity: " + response.list[i].main.humidity + "%");


//                 //card.append(body.append(title, iconImage, tempCard, humidCard))

//                 col.append(card.append(body.append(title, iconImage, tempCard, humidCard)));
//                 $("#forecast-cards").append(col);



//             }
//         });
// }

// Start Btn
$("#btn-Search").click(function (event) {
    event.preventDefault();
    var city = inputCity.val().trim();
    currentWeather(city);
    showList(event);
    storeCity();
    //forecast(city);
    console.log(city);

});