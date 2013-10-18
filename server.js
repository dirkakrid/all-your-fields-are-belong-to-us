/* jshint node: true */
'use strict';
var restify = require('restify'),
	tableApi = require('./table/tableApi'),
	eventApi = require('./eventStore/eventStoreApi'),
	rowsApi = require('./tableRow/tableRowApi'),
	mongoose = require('./mongodb');

var server = restify.createServer(),
    port = process.env.PORT || 8081;

server.use(restify.bodyParser());

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
}

//	server.use(restify.bodyParser({ mapParams: true }));

server.get('/hello/:name', respond);
tableApi.register(server);
eventApi.register(server);
rowsApi.register(server);

server.listen(port);

console.log('> echo server is listening on http://127.0.0.1:'+port);
