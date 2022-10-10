// requestServer.js file

var args = process.argv.slice(2);

const http = require("http");
const request = require("request");
const port = 8686;

http.createServer(requestListenerFunction).listen(port);

function requestListenerFunction(req, res) {

  var url = args[0] ? args[0] : "https://JoshHunter11.github.io";

  request(url, function callbackFunction(error, response, body) {
    if (!body || !response || (error === null && response.statusCode !== 200)) {
      res.end("bad URL\n");
      return response.statusCode;
    }
  
    if (response.statusCode === 200 && !error === true) {
      res.writeHead(response.statusCode,{'content-type':"text/html"});
      res.write(body);
    } 
    
    else if (response.statusCode !== 200 || !error === false) {
      res.writeHead(response.statusCode,{'content-type': "text/plain"});
      res.write(error.toString());
    }
  
    res.end();
  });
}



