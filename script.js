// API key for weather app
var apiKey = "c1d54a66ea754fe5dfb4f032d43b6204"


// Array for search city
var listCities = ["Chicago"]

// Store city list array in local
function storeCities() {
    localStorage.setItem("cities", JSON.stringify(listCities))
}


//Function to generate the Search history list
function createCityList() { 
    //Empty previous list
    $("#city-list").empty()

    //For loop to iterate through all element of the array listCities
    for (var i = 0; i< listCities.length; i++) {
        console.log(listCities[i])

        //Creation of the html element button
        var button = $("<button>")
        //Add the text in the indexed array to the button
        button.text(listCities[i])
        //Add bootstrap style to the button
        button.attr("class", "list-group-item list-group-item-action")
        //Prepend the button to make the last search appear first
        $("#city-list").prepend(button)
    }

}

createCityList()

$('#search-city-button').on('click', function() {

    $("#city-today").empty()
    
    var citySearch = $('#search-city-input').val()

    

})

getWeather ()

    function getWeather () {

        var todayDate = new Date();
        var date = "(" + (todayDate.getMonth()+1) + '/'+ todayDate.getDate() + "/" + todayDate.getFullYear() + ")"

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "detroit" + "&units=imperial&appid=" + apiKey

        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(response)
                $("#city-name").text(response.name + " " + date)
                var iconLink = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
                var icon = $('<img>').attr("src", iconLink)
                $("#city-name").append(icon)

                var temperature = $("<p>")
                temperature.text("Temperature: " + response.main.temp + " F")
                $("#city-weather").append(temperature)
                
                var humidity = $("<p>")
                humidity.text("Humidity: " + response.main.humidity + "%")
                $("#city-weather").append(humidity)

                var wind = $("<p>")
                wind.text("Wind Speed: " + response.wind.speed + " mph")
                $("#city-weather").append(wind)

                /* var uv = $("<p>")
                uv.text("UV Index: " + response.wind.speed)
                $("#city-weather").append(uv) */
        })
    }

