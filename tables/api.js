var repo = require('./repo')
	eventTypes = require('../eventTypes'),
	eventStore = require('../eventStore/repo');

var tables = {};

function generateUuid() {
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    return v.toString(16);
	});

	return uuid;
};

tables.getAll = function (req, resp, next) {
	repo.getAll(function(err,data){
		resp.status = 200;
		resp.send(data);
	});
};

tables.getOne = function (req, resp, next) {
	repo.getOne(req.params.id, function(err,data){
		resp.status = 200;
		resp.send(data);
	});
};

tables.add = function (req, resp, next) {
	eventStore.publish(
		"someuser", 
		eventTypes.table.add, 
		req.params, 
		function(err, result){
			resp.status = 200;
			resp.send(result);
	});
};

tables.edit = function (req, resp, next) {
	eventStore.publish(
		"someuser", 
		eventTypes.table.update, 
		req.params, 
		function(err, result){
			resp.status = 200;
			resp.send(result);
	});

};

tables.del = function (req, resp, next) {
	eventStore.publish(
		"someuser", 
		eventTypes.table.remove, 
		req.params, 
		function(err, result){
			resp.status = 200;
			resp.send(result);
	});
};

exports.register = function (server) {
	server.get('/tables', tables.getAll);
	server.get('/tables/:id', tables.getOne);
	server.post('/tables', tables.add);
	server.put('/tables/:id', tables.edit);
	server.del('/tables/:id', tables.del);
};