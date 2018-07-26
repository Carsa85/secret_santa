var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

http
  .createServer(function(req, res) {
    var q = url.parse(req.url, true);
    if (!q.pathname || q.pathname === "/") {
      q.pathname = "/index.html";
    }
    var filename = "./" + q.pathname;
    var extname = path.extname(filename);
    var contentType = "text/html";
    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
      case ".wav":
        contentType = "audio/wav";
        break;
    }

    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 not found");
      }
      res.writeHead(200, { "Content-Type": contentType });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
