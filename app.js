const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config()
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const cityName = req.body.city;                                                                                            //stores city name entered
console.log(process.env);
    const apiKey = process.env.API_KEY;                                                                                        //api key

    const units = "metric";                                                                                                    //temperature unit - celsius
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=" + units;      //api endpoints, path and parameters

    https.get(url, function (response) {

        console.log(response.statusCode);

        response.on("data", function (data) {

            const weatherData = JSON.parse(data);                                                          //weather data in JSON format  

            var temp = weatherData.main.temp;                                                              //stores temperature value
            const icon = weatherData.weather[0].icon;                                                      //stores weather icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";                       //URL for weather icon
res.setHeader('Content-type','text/html')
            res.write("<h1>weather is " + temp + " degree celsius</h1>");                                  //weather result heading
            res.write("<img src=" + imageURL + ">");                                                       //weather icon image

            res.send();
        })
    });

});


app.listen(3000, function () {
    console.log("server is running on 3000");
});
