var mongoose = require('../mongodb'),
	tableRepo = require('../table/tableRepo'),
	util = require('util');

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
		model.remove({id: event.data.id}, function(err, table){
			updateEventStatus(event, 
				err,
				"created table: " + table.name,
				"/tables/" + table.id);
		});
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
	tableRow.save(function (err) {
		updateEventStatus(event, 
			err,
			"created row: " + table.name,
			"/tables/" + event.data.tableId + "/rows/" + tableRow.id);
	  });
}

function updateEventStatus(event, err, history, ref) {
		event.status = util.format("%j", err) || "done";
		event.history = history;
		event.ref = ref;
		event.save();
}

exports.createTableRow = createTableRow;
exports.updateTableRow = updateTableRow;
exports.deleteTableRow = deleteTableRow;

exports.getOne = getOne;
exports.getAll = getAll;
