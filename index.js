import bodyparser from "body-parser";
import express from "express";
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;
const apiKey = process.env.API_KEY;
let submit = false;
let error = false;

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res)=>{
    submit = false;
    res.render("index.ejs", {"submit": submit, "error": error});
})
app.post('/submit', async (req, res)=>{
    try{
    const data = await axios.get('https://api.openweathermap.org/geo/1.0/zip?zip='+req.body.zip+',US&appid=' +apiKey);
    const parsedData = data.data;
    const parish = parsedData.name;
    //Gets the latitude and longitude via the api and parses it as well as the parish/county

    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${parsedData.lat}&lon=${parsedData.lon}&appid=${apiKey}`);
    let parsedWeather = weatherData.data;
    //Passes in the latitude and longitude into the api and grabs the current data

    let tempFar = Math.ceil((parsedWeather.main.temp) * 9/5 -459.67); 
    let tempFeel = Math.ceil((parsedWeather.main.feels_like) * 9/5 -459.67);
    let currentWeather = parsedWeather.weather[0].main;
    let humidity = parsedWeather.main.humidity;
    let windSpeed = Math.round(parsedWeather.wind.speed * 223.694 ) / 100;
    console.log(currentWeather);
    let day = true;
    let clarity = "clear";
    let rain = false;
    let cloudCoverage = parsedWeather.clouds.all;
    //Converts all metrics to the imperial system and grabs other relevant weather data
    console.log(parsedWeather.clouds.all);
    if (currentWeather === "Clouds"){
        clarity = "kindacloudy"
    }
    else if (currentWeather === "Rain"){
        rain = true;
    }
    console.log("windspeed:" +parsedWeather.wind.speed);
    let now = new Date()
    let hour = now.getHours();
    console.log("Hour: " +hour);
    if (hour > 6 && hour < 20){
        day = false;
    }
    //Calculates if it is night or day
    console.log("Day is " + day);
    submit = true;
    res.render("index.ejs", {"submit": submit, "rain": rain, "temp": tempFar + "°F", "night": day, "parish": parish, "current": currentWeather, "clarity": clarity, "feel": tempFeel + "°F", "humidity": humidity, "speed": windSpeed, "coverage": cloudCoverage, "tempUnit": "Fahrenheit"});
}
catch (error){
    let response = req.body.zip;
    res.render("index.ejs", {"submit": submit, "error": error, "response": response});
}
});
app.listen(port, ()=>{console.log("listening on " +port);});