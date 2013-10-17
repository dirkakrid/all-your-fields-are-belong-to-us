var tables = {};

function generateUuid() {
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    return v.toString(16);
	});

	return uuid;
}

tables.getAll = function (req, resp, next) {
	var resultData = { 
		tables: [
		    "/tables/{id}",
		    "/tables/{id2}"
	    ]
	};
	resp.send(JSON.stringify(resultData));
	resp.status = 200;
}

tables.getOne = function (req, resp, next) {
	var resultData = {
		id: "/tables/" + req.params.id,
		version: "20131018T131415Z",
		name: "table name",
		fields: [{
			id: "xxxx",
			name: "field name",
			type: "string"
		}, {
			id: "yyy",
			name: "another field",
			type: "string"
		}]
	}

	resp.send(JSON.stringify(resultData));
	resp.status = 200;
}

tables.add = function (req, resp, next) {
	var resultData = {
		eventid: generateUuid()
	}

	resp.send(JSON.stringify(resultData));
	resp.status = 200;
}

tables.edit = function (req, resp, next) {
	var resultData = {
		eventid: generateUuid()
	}

	resp.send(JSON.stringify(resultData));
	resp.status = 200;
}

tables.del = function (req, resp, next) {
	var resultData = {
		eventid: generateUuid()
	}

	resp.send(JSON.stringify(resultData));
	resp.status = 200;
}

exports.register = function (server) {
	server.get('/tables', tables.getAll);
	server.get('/tables/:id', tables.getOne);
	server.post('/tables', tables.add);
	server.put('/tables/:id', tables.edit);
	server.del('/tables/:id', tables.del);
}