// requestServer.js file
const http = require("http");
const request = require("request");
const port = 8686;

http.createServer(requestListenerFunction).listen(port);

function requestListenerFunction(req, res) {
  request("https://JoshHunter11.github.io", callbackFunction);
}

function callbackFunction(error, response, body) {
  if (!body || !response || (error === null && response.statusCode !== 200)) {
    res.end("bad URL\n");
    return response.statusCode;
  }

  if (response.statusCode === 200 && !error === true) {
    res.statusCode = 200;
    res.writeHead("text/html");
    res.write(body);
  } 
  
  else if (response.statusCode !== 200 || !error === false) {
    res.statusCode = response.statusCode;
    res.writeHead("text/html");
    res.write(error.toString());
  }

  res.end();
}
