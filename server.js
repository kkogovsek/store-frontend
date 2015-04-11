var express = require("express"),
    app = express(),
    hostname = 'localhost',
    ip = '192.168.12.136',
    port = 8080;

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.use(express.static(__dirname + '/' + process.argv[2]));

app.listen(port, hostname);
app.listen(port, ip);
