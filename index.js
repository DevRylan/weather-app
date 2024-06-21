import bodyparser from "body-parser";
import express from "express";
import axios from 'axios';

const app = express();
const port = 3000;
let submit = false;
const apiKey = 'a5f6f109d097624430f0629792d71c54';

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res)=>{
    submit = false;
    
    res.render("index.ejs", {"submit": submit});
})
app.post('/submit', async (req, res)=>{
    const data = await axios.get('https://api.openweathermap.org/geo/1.0/zip?zip='+req.body.zip+',US&appid=' +apiKey);
    const parsedData = data.data;
    const parish = parsedData.name;

    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${parsedData.lat}&lon=${parsedData.lon}&appid=${apiKey}`);
    let parsedWeather = weatherData.data;
    let tempF = Math.ceil((parsedWeather.main.temp) * 9/5 -459.67); 
    let currentWeather = parsedWeather.weather[0].main;
    console.log(currentWeather);
    let day = true;
    let clarity = "clear";
    //converts to Farienheight because for some fucking reason it has it in kelvin
    console.log(parsedWeather.clouds.all);
    if (currentWeather === "Clouds"){
        clarity = "kindacloudy"
    }

    let now = new Date()
    let hour = now.getHours();
    console.log("Hour: " +hour);
    if (hour > 6 && hour < 19){
        day = false;
    }
    console.log("Day is " +day);
    submit = true;
    res.render("index.ejs", {"submit": submit, "temp": tempF, "dayNight": day, "parish": parish, "current": currentWeather, "clarity": clarity})
});
app.listen(port, ()=>{console.log("listening on " +port);});