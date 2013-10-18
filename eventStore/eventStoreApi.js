var repo = require('./eventStoreRepo');

var events = {};

events.getAll = function (req, resp, next) {
	repo.getAll(function(err,data){
		resp.status = 200;
		resp.send(data);
	});
};

events.getOne = function (req, resp, next) {
	repo.getOne(req.params.id, function(err,data){
		resp.status = 200;
		resp.send(data);
	});
};

exports.register = function (server) {
	server.get('/events', events.getAll);
	server.get('/events/:id', events.getOne);
}