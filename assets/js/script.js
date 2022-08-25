const API_KEY = 'a63128da5bbea92dc82e57485296ca3c';

var search = () => {
    var city = document.getElementById("search-box").value;
    fetchCityData(city);
}

var fetchCityData = function(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY;
    fetch(queryURL).then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            displayForecast(city, data);
        });
        } else {
        alert("Error: " + response.statusText);
        }
    });
}
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

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const removeChildren = (parent) => {
    while (parent.lastChild) {
        if(parent.lastChild.checked && questions[questionNumber - 1].correctAnswerIndex == parent.lastChild.id){
            correctAnswers++;
        }
        parent.removeChild(parent.lastChild);
    }
};

