//@ts-check

const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const {
        cityName
    } = req.body;

    // Insert your own appid in the URL
    const query = cityName;
    const apiKey = `PUT YOUR API KEY HERE`;
    const units = `imperial`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;
    https.get(url, (resp) => {
        resp.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

            res.write(`<h1>The temperature in ${query} is ${temp} degrees Fahrenheit.</h1>`);
            res.write(`<p>The weather is currently ${desc}.</p>`);
            res.write(`<img src="${imageURL}">`);
            res.write(`<br><a href="">Return to the Home Page</a>`);
            res.send();
        });
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
