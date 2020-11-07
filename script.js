// API key for weather app
var apiKey = "c1d54a66ea754fe5dfb4f032d43b6204"

// Array for search city
var listCities = []

// Store city list array in local
function storeCities() {
    localStorage.setItem("cities", JSON.stringify(listCities))
}

createCityList()

//Function to generate the Search history list
function createCityList() { 
    //Empty previous list
    $("#city-list").empty()

    //For loop to iterate through all element of the array listCities
    for (var i= 0; i< listCities.length; i++) {
        console.log(listCities[i])

        //Creation of the html element button
        var button = $("<button>")
        //Add the text in the indexed array to the button
        button.text(listCities[i])
        //Add bootstrap style to the button
        button.attr("class", "list-group-item list-group-item-action city-button")
        //Add value to the button
        button.attr("value", listCities[i])
        //Prepend the button to make the last search appear first
        $("#city-list").prepend(button)
    }

}

//On click City weather search 
$('#search-city-button').on('click', function() {
    event.preventDefault();
    
    //Var to add value of the city searched
    var citySearch = $('#search-city-input').val().trim()
    console.log(citySearch)
    listCities.push(citySearch);
    createCityList()
    storeCities()

    //Function to generate the weather researched
    function getWeather () {
        //Clean previous information displayed
        $("#city-name").empty();
        $("#city-weather").empty();
        
        // Getting the current date
        var todayDate = new Date();
        var date = "(" + (todayDate.getMonth()+1) + '/'+ todayDate.getDate() + "/" + todayDate.getFullYear() + ")"

        //Weather API URL
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + apiKey

        //Calling weather API
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                //Get Name of the city + weather icons and append to the page
                $("#city-name").text(response.name + " " + date)
                var iconLink = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
                var icon = $('<img>').attr("src", iconLink)
                $("#city-name").append(icon)
                //Get temperature in F and append to the page
                var temperature = $("<p>")
                temperature.text("Temperature: " + response.main.temp + " F")
                $("#city-weather").append(temperature)
                //Get humidity and append to the page    
                var humidity = $("<p>")
                humidity.text("Humidity: " + response.main.humidity + "%")
                $("#city-weather").append(humidity)
                //Get wind and append to the page
                var wind = $("<p>")
                wind.text("Wind Speed: " + response.wind.speed + " mph")
                $("#city-weather").append(wind)

                //UV INFORMATIONS
                //Latitude and longitude for the UV API
                var lat = response.coord.lat
                var lon = response.coord.lon

                //UV Function
                function getUvData () {
                    //UV Api   
                    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey

                    //Calling UV API
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    //Get information about UV on location and append them to the page
                    }).then(function(data) {
                        var uv = $("<p>")
                        uv.text("UV Index: " + data.value)
                        $("#city-weather").append(uv)
                    })
                }
                //Start UV function to print UV info
                getUvData ()
        })
    }

    //Function to generate the forecast on the city researched
    function getForecast() {
        //Clean forecast div
        $("#city-forecast").empty();

        var  queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=" + apiKey

        //Calling Forecast API
        $.ajax({
            url: queryForecastURL,
            method: "GET"
        //Get information about forecast and append them to the page
        }).then(function(response) {
            
            //For loop to generate Forecast cards
            for (var i= 0; i< response.list.length; i++) {
                //Selecting only forecast array at 12:00:00
                if (response.list[i].dt_txt.search("12:00:00") == 11) {
                    //Var with the array
                    var forecastDay = response.list[i]

                    //Create the main div
                    var divMain = $("<div>")
                    divMain.attr("class", "card bg-info shadow m-2")
                    $("#city-forecast").append(divMain)

                    //Create the card div
                    var divCard = $("<div>")
                    divCard.attr("class", "card-body")
                    $(divMain).append(divCard)

                    //Create the title
                    var titleCard = $("<h4>")
                    var titleName = response.list[i].dt_txt
                    var firstTitle = titleName.replace(/ .*/,'')
                    titleCard.text(firstTitle)

                    //Create the icon
                    var iconForecast = forecastDay.weather[0].icon
                    var iconCardLink = "http://openweathermap.org/img/w/" + iconForecast + ".png"
                    var iconCard = $('<img>').attr("src", iconCardLink)

                    //Create the temperature and humidity paragraph
                    var tempCard = $("<p>")
                    var humCard = $("<p>")
                    tempCard.text("Temperature: " + forecastDay.main.temp + " F")
                    humCard.text("Humidity: " + forecastDay.main.humidity + "%")

                    //Append everything
                    $(divCard).append(titleCard, iconCard, tempCard, humCard)
                }              
            }
        })
    }

    //Call function to generated Weather
    getWeather()
    //Call function to generated Forecast
    getForecast()
})

// click event the weather on list button
$("#city-list").on("click", ".city-button", function() {

    var citySearch = $(this).val()
    console.log("ReClick", citySearch)

    //Function to generate the weather researched
    function getWeather () {
        //Clean previous information displayed
        $("#city-name").empty();
        $("#city-weather").empty();
        
        // Getting the current date
        var todayDate = new Date();
        var date = "(" + (todayDate.getMonth()+1) + '/'+ todayDate.getDate() + "/" + todayDate.getFullYear() + ")"

        //Weather API URL
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + apiKey

        //Calling weather API
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                //Get Name of the city + weather icons and append to the page
                $("#city-name").text(response.name + " " + date)
                var iconLink = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
                var icon = $('<img>').attr("src", iconLink)
                $("#city-name").append(icon)
                //Get temperature in F and append to the page
                var temperature = $("<p>")
                temperature.text("Temperature: " + response.main.temp + " F")
                $("#city-weather").append(temperature)
                //Get humidity and append to the page    
                var humidity = $("<p>")
                humidity.text("Humidity: " + response.main.humidity + "%")
                $("#city-weather").append(humidity)
                //Get wind and append to the page
                var wind = $("<p>")
                wind.text("Wind Speed: " + response.wind.speed + " mph")
                $("#city-weather").append(wind)

                //UV INFORMATIONS
                //Latitude and longitude for the UV API
                var lat = response.coord.lat
                var lon = response.coord.lon

                //UV Function
                function getUvData () {
                    //UV Api   
                    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey

                    //Calling UV API
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    //Get information about UV on location and append them to the page
                    }).then(function(data) {
                        var uv = $("<p>")
                        uv.text("UV Index: " + data.value)
                        $("#city-weather").append(uv)
                    })
                }
                //Start UV function to print UV info
                getUvData ()
        })
    }

    //Function to generate the forecast on the city researched
    function getForecast() {
        //Clean forecast div
        $("#city-forecast").empty();

        var  queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=" + apiKey

        //Calling Forecast API
        $.ajax({
            url: queryForecastURL,
            method: "GET"
        //Get information about forecast and append them to the page
        }).then(function(response) {
            
            //For loop to generate Forecast cards
            for (var i= 0; i< response.list.length; i++) {
                //Selecting only forecast array at 12:00:00
                if (response.list[i].dt_txt.search("12:00:00") == 11) {
                    //Var with the array
                    var forecastDay = response.list[i]

                    //Create the main div
                    var divMain = $("<div>")
                    divMain.attr("class", "card bg-info shadow m-2")
                    $("#city-forecast").append(divMain)

                    //Create the card div
                    var divCard = $("<div>")
                    divCard.attr("class", "card-body")
                    $(divMain).append(divCard)

                    //Create the title
                    var titleCard = $("<h4>")
                    var titleName = response.list[i].dt_txt
                    var firstTitle = titleName.replace(/ .*/,'')
                    titleCard.text(firstTitle)

                    //Create the icon
                    var iconForecast = forecastDay.weather[0].icon
                    var iconCardLink = "http://openweathermap.org/img/w/" + iconForecast + ".png"
                    var iconCard = $('<img>').attr("src", iconCardLink)

                    //Create the temperature and humidity paragraph
                    var tempCard = $("<p>")
                    var humCard = $("<p>")
                    tempCard.text("Temperature: " + forecastDay.main.temp + " F")
                    humCard.text("Humidity: " + forecastDay.main.humidity + "%")

                    //Append everything
                    $(divCard).append(titleCard, iconCard, tempCard, humCard)
                }              
            }
        })
    }

    //Call function to generated Weather
    getWeather()
    //Call function to generated Forecast
    getForecast()
})