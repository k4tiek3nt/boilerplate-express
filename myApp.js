var express = require('express');
var app = express();
console.log("Hello World");

const path = require("path");
const indexPath = path.resolve("./views/index.html");

/* app.get("/", function(req, res) {
  res.send("Hello Express");
}); */

// Normal usage
app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

app.use(function(req, res, next) {
	let string = req.method + " " + req.path + " - " + req.ip;
	console.log(string);
	next();
});

app.get("/", function(req, res) {
  res.sendFile(indexPath); // changed from __dirname + "/views/index.html" to indexPath
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
