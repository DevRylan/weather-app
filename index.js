import bodyparser from "body-parser";
import express from "express";
import axios from 'axios';

const app = express();
const port = 3000;

const apiKey = 'a5f6f109d097624430f0629792d71c54';

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render("index.ejs");
})
app.post('/submit', async (req, res)=>{
    const data = await axios.get('https://api.openweathermap.org/geo/1.0/zip?zip='+req.body.zip+',US&appid=' +apiKey);
    const parsedData = data.data;
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${parsedData.lat}&lon=${parsedData.lon}&appid=${apiKey}`);
    let parsedWeather = weatherData.data;
    let temp = Math.ceil((parsedWeather.main.temp) * 9/5 -459.67);
    res.json({"weather": temp});
});
app.listen(port, ()=>{console.log("listening on " +port);});