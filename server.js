/* jshint node: true */
'use strict';
var restify = require('restify')

var server = restify.createServer(),
    port = process.env.PORT || 8081;

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
}

//	server.use(restify.bodyParser({ mapParams: true }));

server.get('/hello/:name', respond);
server.listen(port);

console.log('> echo server is listening on http://127.0.0.1:'+port);
