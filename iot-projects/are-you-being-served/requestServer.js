// requestServer.js file
const http = require('http');
const request = require('request');
const port = 8686;

http.createServer(function(req, res){
    res.writeHead(404, {'content-Type': 'text/plain'});
    res.write("Here's the entire bee movie script: ");
    res.write("wait ");
    res.end('nvm it doesnt work');
}).listen(port);