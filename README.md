# homework-06

Weather Dashboard


## Links:

GitHub repository: 
https://github.com/Clem-ent17/homework-06

Live link to access the application:
https://clem-ent17.github.io/homework-06/


## Request:

* Weather board for traveler to display useful forecast informations.

* The traveler need to see the weather outlook for multiple cities

* With the correct weather information the traveler can plan a trip accordingly


## Description:

* This App is retrieving data from a [OpenWeather API](https://openweathermap.org/api) and it is using it in the context of their own. 

* This third-party API allow the App to access data and functionality by making requests with specific parameters to a URL. 

* This App is to built to display a weather dashboard that run in the browser and feature dynamically updated HTML and CSS.

* This App use `localStorage` to store any persistent data, like reseach history

* The following picture demonstrates the application design:
![day planner demo](./Assets/06-server-side-apis-homework-demo.png)


## Usage:

* When the app is launched, the App display a weather dashboard with form inputs

* The user can search for a city

* Then the user is presented with current and future conditions for that city and that city is added to the search history

* When the user view current weather conditions for that city, the user is presented with:
    - City name
    - Date
    - Icon representation of weather conditions
    - Temperature
    - Humidity
    - Wind speed
    - UV index (with color coding)

* When the user view future weather conditions for that city, the user is presented with a 5-day forecast that displays:
    - Date
    - Icon representation of weather conditions
    - Temperature
    - Humidity

* If the user click on a city in the search history, he is presented again with current and future conditions for that city

* When the user reopen the weather dashboard, he is presented with the last searched city forecast


## Technologies:

* Technology used in this application: 
    - HTML
    - CSS
    - Bootstrap
    - JavaScript
    - jQuery
    - GitHub

* API used in this application: 
    - Weather API: https://openweathermap.org/api
        - Current Weather documentation: https://openweathermap.org/current
        - 5 Days Forecast documentation: https://openweathermap.org/forecast5
        - Current UV documentation: https://openweathermap.org/api/uvi


## Project status:

Work as completed.

Possible improvement: 
    - Better use and call of the getWeather() and getForecast() functions

- - -

Clement Valles