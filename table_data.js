var tableData = {};

tableData.getAll = function(req, resp, next) {
	var tableid = req.params.tableid,
	    tableUrl = "/tables/tableid";

	var result = {
		rows:[
			tableUrl + "/data/1",
			tableUrl + "/data/2"
		]
	};

	resp.send(JSON.stringify(result));
	resp.status = 200;
}

tableData.getOne = function(req, resp, next) {
	var tableid = req.params.tableid,
	    tableUrl = "/tables/tableid";

	var result = {
		id: tableUrl + "/data/" + req.params.id,
		"xxx": "Value 1",
		"yyy": "Value 2"
	}
	
	resp.send(JSON.stringify(result));
	resp.status = 200;
}

tableData.addRow = function(req, resp, next) {
	var tableid = req.params.tableid,
	    tableUrl = "/tables/tableid";

	// TODO: Send command to add row to event queue

	var result = {
		eventId: "123455"
	}

	
	resp.send(JSON.stringify(result));
	resp.status = 200;
}

tableData.editRow = function(req, resp, next) {
	var tableid = req.params.tableid,
	    tableUrl = "/tables/tableid";

	// TODO: Send command to add row to event queue

	var result = {
		eventId: "123456		"
	}

	
	resp.send(JSON.stringify(result));
	resp.status = 200;
}

tableData.deleteRow = function(req, resp, next) {
	var tableid = req.params.tableid,
	    tableUrl = "/tables/tableid";

	// TODO: Send command to add row to event queue

	var result = {
		eventId: "123457"
	}

	
	resp.send(JSON.stringify(result));
	resp.status = 200;
}

exports.register = function(server) {
	server.get('/tables/:tableid/data', tableData.getAll);
	server.get('/tables/:tableid/data/:id', tableData.getOne);
	server.post('/tables/:tableid/data', tableData.addRow);
	server.put('/tables/:tableid/data/:id', tableData.editRow);
	server.del('/tables/:tableid/data/:id', tableData.deleteRow);
}