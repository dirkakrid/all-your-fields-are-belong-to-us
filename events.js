var events = {};

events.getEventStatus = function (req, resp, next) {
	var result = {
		id: "/tables/1"
	}

	resp.send(JSON.stringify(result));
	resp.status = 200;
}

exports.register = function (server) {
	server.get('/events/:id', events.getEventStatus);
}