var express = require("express"),
    app = express(),
    hostname = 'localhost',
    port = 8080;

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.use(express.static(__dirname + '/build'));

app.listen(port, hostname);