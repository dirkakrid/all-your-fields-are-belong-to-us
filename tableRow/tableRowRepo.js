var mongoose = require('../mongodb')
	tableRepo = require('../table/tableRepo');

function createTableRow(event){
	getModel(event.data.tableId, function(err, model){
		setTableRow(event, new model());
	});
}

function updateTableRow(event){
	getModel(event.data.tableId, function(err, model){
		setTableRow(event, model.findById(event.data.id));
	});
}

function deleteTableRow(event){
	getModel(event.data.tableId, function(err, model){
		model.remove({id: event.data.id});
	});
}

function getOne(tableId, rowId, callback){
	getModel(tableId, function(err, model){
		model.findById(rowId, callback);
	});
}

function getAll(tableId, callback){
	getModel(tableId, function(err, model){
		model.find().sort('name', 1).execFind(callback);
	});
}

function getModel(tableId, callback){
	tableRepo.getOne(tableId, function(err, table){
		var model = buildModel(table);
		callback(err, model);
	});
}

function convertType(fieldType){
	return String;
}

function buildModel(table) {
	var schemaDef = {};
	for (var i = table.fields.length - 1; i >= 0; i--) {
		var field = table.fields[i];
		schemaDef[field.name] = convertType(field.type);
	};

	var schema = new mongoose.Schema(schemaDef);

	return mongoose.model('table_' + table.id, schema);
}

function setTableRow(event, tableRow) {

	for(var k in event.data){
		tableRow[k] = event.data[k];
	}

	//todo: error handling
	tableRow.save(function () {
		updateEventStatus(event, "set tableRow: " + tableRow.name);
	  });
}

function updateEventStatus(event, history) {
		event.status = "done";
		event.history = history;
		event.save();
}

exports.createTableRow = createTableRow;
exports.updateTableRow = updateTableRow;
exports.deleteTableRow = deleteTableRow;

exports.getOne = getOne;
exports.getAll = getAll;
