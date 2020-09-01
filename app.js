const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});


app.post("/weather", function(req, res) {
  const query = req.body.city
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=728400902af1c70e12b68411802f073a&units=metric"

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<body style='background-color: #333;'>");
      res.write("<p style='color:#fff; text-align:center; margin-top:10em;'>The condition is currently " + description + "</p>");
      res.write("<h1 style='color:#fff;text-align:center;'>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<center><img src=" + imageURL + " style='width:200px;height:200px'></center>");
      res.write("</body>");
      res.send()
    })
  })
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
