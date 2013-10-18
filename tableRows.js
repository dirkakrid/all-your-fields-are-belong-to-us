var tableData = {};

tableData.getAll = function(req, resp, next) {
	var tableid = req.params.tableid,
	    tableUrl = "/tables/tableid";

	var result = {
		rows:[
			tableUrl + "/rows/1",
			tableUrl + "/rows/2"
		]
	};

	resp.send(JSON.stringify(result));
	resp.status = 200;
}

tableData.getOne = function(req, resp, next) {
	var tableid = req.params.tableid,
	    tableUrl = "/tables/tableid";

	var result = {
		id: tableUrl + "/rows/" + req.params.id,
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
		eventId: "123456"
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
	server.get('/tables/:tableid/rows', tableData.getAll);
	server.get('/tables/:tableid/rows/:id', tableData.getOne);
	server.post('/tables/:tableid/rows', tableData.addRow);
	server.put('/tables/:tableid/rows/:id', tableData.editRow);
	server.del('/tables/:tableid/rows/:id', tableData.deleteRow);
}