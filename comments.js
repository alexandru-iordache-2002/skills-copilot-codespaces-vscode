// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var comments = [];
http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if (pathname == '/') {
    fs.readFile('./comment.html', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(data);
    });
  } else if (pathname == '/comment') {
    var query = urlObj.query;
    comments.push(query.comment);
    res.end(query.comment);
  } else if (pathname == '/getComments') {
    var data = JSON.stringify(comments);
    res.end(data);
  } else {
    fs.readFile('.' + pathname, function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(data);
    });
  }
}).listen(3000);
console.log('Server running at http://localhost:3000/');