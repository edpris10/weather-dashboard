const API_KEY = 'a63128da5bbea92dc82e57485296ca3c';

//search input
var search = () => {
    var city = document.getElementById("search-box").value;
    fetchCityData(city);
}
//gets city data from API
var fetchCityData = function(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY;
    fetch(queryURL).then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            displayForecast(city, data);
            fetchFiveDayForecast(data.coord.lon, data.coord.lat);
        });
        } else {
        alert("Error: " + response.statusText);
        }
    });
}
//get 5 day forecast from API
var fetchFiveDayForecast = function(lon, lat){
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid="+ API_KEY; 
    console.log(queryURL);
    fetch(queryURL).then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            displayFiveDayForecast(data);
        });
        } else {
        alert("Error: " + response.statusText);
        }
    });
}
//5 day forecast display
var displayFiveDayForecast = function(data){
    var currentDay = 1; 
    for(var i = 0; i < 5*8; i+=8){
       var currentDayData = data.list[i];
       var day = currentDayData.dt_txt;
       day = day.slice(0, 10);
       
       
       //display 5 day forecast information
       var cityElement = document.createElement("h2");
       cityElement.innerHTML = day;
   
       var feelsLike = document.createElement("p");
       feelsLike.innerHTML = "Feels like: " + currentDayData.main.feels_like;
   
       var humidity = document.createElement("p");
       humidity.innerHTML = "Humidity: " + currentDayData.main.humidity;
   
       var wind = document.createElement("p");
       wind.innerHTML = "Wind Speed: " + currentDayData.wind.speed;
   
       var temp = document.createElement("p");
       temp.innerHTML = "Temperature: " + currentDayData.main.temp;
   
       var parent = document.getElementById('day' + currentDay);
       removeChildren(parent);

       $('#day' + currentDay).append(cityElement);
       $('#day' + currentDay).append(feelsLike);
       $('#day' + currentDay).append(humidity);
       $('#day' + currentDay).append(wind);
       $('#day' + currentDay).append(temp);
       currentDay++;
    }
}
// current day forecast
var displayForecast = function(city, data) {
    //delete previous search
    var parent = document.getElementById("display-forecast");
    removeChildren(parent);
    //date next to city
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    //create weather element
    var cityElement = document.createElement("h2");
    cityElement.innerHTML = city.charAt(0).toUpperCase() + city.slice(1) + "(" + today + ")";

    var feelsLike = document.createElement("p");
    feelsLike.innerHTML = "Feels like: " + data.main.feels_like;

    var humidity = document.createElement("p");
    humidity.innerHTML = "Humidity: " + data.main.humidity;

    var wind = document.createElement("p");
    wind.innerHTML = "Wind Speed: " + data.wind.speed;

    var temp = document.createElement("p");
    temp.innerHTML = "Temperature: " + data.main.temp;

    $('#display-forecast').append(cityElement);
    $('#display-forecast').append(feelsLike);
    $('#display-forecast').append(humidity);
    $('#display-forecast').append(wind);
    $('#display-forecast').append(temp);
};

const removeChildren = (parent) => {
    while (parent.lastChild) {
        if(parent.lastChild.checked && questions[questionNumber - 1].correctAnswerIndex == parent.lastChild.id){
            correctAnswers++;
        }
        parent.removeChild(parent.lastChild);
    }
};

