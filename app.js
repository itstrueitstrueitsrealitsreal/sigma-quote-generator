const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
  console.log("Post request received");
  const url = "https://sigma-male-grindset-api.vercel.app/api/quotes"

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on('data', function(data) {
      const sigmaData = JSON.parse(data);
      const quote = sigmaData.quote;
      const author = sigmaData.author;
      res.write("<h1>" + quote + "</h1>");
      res.write("<h2>-" + author + "</h2>");
      res.write('<form action="/" method="post"><button type="submit"> What colour is YOUR Bugatti?</button></form>');

      res.send();
    })
  })
}) 

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})