var express = require('express');
var app = express();
console.log("Hello World");

const path = require("path");
const indexPath = path.resolve("./views/index.html");
var bodyParser = require("body-parser");

/* app.get("/", function(req, res) {
  res.send("Hello Express");
}); */

// Normal usage
app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

const middleware = function(req, res, next) {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, function(req, res) {
  res.send({
    time: req.time
  });
});

app.get("/:word/echo", function(req, res) {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.route("/name")
	.get(function(req, res) {
		var {
			first: firstName,
			last: lastName
		} = req.query;
		res.json({
			name: `${firstName} ${lastName}`
		});
	})
	.post(function(req, res) {
		var {
			first: firstName,
			last: lastName
		} = req.body;
		console.log(`${firstName} ${lastName}`);
		res.send({
			name: `${firstName} ${lastName}`
		});
	});

























 module.exports = app;