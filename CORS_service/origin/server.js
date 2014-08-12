var express=require('express');
var http = require('http');

var app = express();
app.use(express.static(__dirname + '/static'));

http.createServer(app).listen(8088);
console.log("server is listening on 8088. Access http://localhost:8088/index.html");