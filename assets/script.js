var btnSearchCity = $("#btn-Search");
var inputCity = $("#input-City");
var city = "";
var cityS = [];



$("#btn-Search").click(function(event){
    event.preventDefault();
    var city = inputCity.val().trim(); 
    currentWeather();
    $("#input-City").val("");
    console.log(city);        
});

function currentWeather(){
    
}