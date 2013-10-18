var repo = require('./tableRowRepo'),
	tableRowEvents = require('./tableRowEvents'),
	eventTypes = require('../eventTypes'),
	eventStore = require('../eventStore/eventStoreRepo');

var tableRows = {};

tableRows.getAll = function(req, resp, next) {
	repo.getAll(req.params.tableId, function(err,data){
		resp.status = 200;
		resp.send(data);
	});
}

tableRows.getOne = function(req, resp, next) {
	repo.getOne(req.params.tableId, req.params.id, function(err,data){
		resp.status = 200;
		resp.send(data);
	});
}

tableRows.addRow = function(req, resp, next) {
	eventStore.publish(
		"someuser", 
		eventTypes.tableRow.add, 
		req.params, 
		function(err, result){
			resp.status = 200;
			resp.send(result);
	});
}

tableRows.editRow = function(req, resp, next) {
	eventStore.publish(
		"someuser", 
		eventTypes.tableRow.update, 
		req.params, 
		function(err, result){
			resp.status = 200;
			resp.send(result);
	});
}

tableRows.deleteRow = function(req, resp, next) {
	eventStore.publish(
		"someuser", 
		eventTypes.tableRow.remove, 
		req.params, 
		function(err, result){
			resp.status = 200;
			resp.send(result);
	});
}

exports.register = function(server) {
	server.get('/tables/:tableId/rows', tableRows.getAll);
	server.get('/tables/:tableId/rows/:id', tableRows.getOne);
	server.post('/tables/:tableId/rows', tableRows.addRow);
	server.put('/tables/:tableId/rows/:id', tableRows.editRow);
	server.del('/tables/:tableId/rows/:id', tableRows.deleteRow);
}