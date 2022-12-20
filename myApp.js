var express = require('express');
var app = express();
console.log("Hello World");

/* app.get("/", function(req, res) {
  res.send("Hello Express");
}); */

// Normal usage
app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res) {
  const mySecret = process.env.MESSAGE_STYLE
  if (mySecret == "uppercase") {
    res.json({
      message: "Hello json".toUpperCase()
    });
  } else {
    res.json({
      message: "Hello json"
    });
  }
});






























 module.exports = app;
