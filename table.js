var mongoose = require('mongoose/');

// Create a schema for our data
var TableSchema = new Schema({
  name: String,
  fields: [{
  	id: String,
  	name: String,
  	type: String
  }],
  version: String
});

var Table = mongoose.model('Tables', TableSchema);

/*
  type: String, 
  data: {}, //schemaless (i.e. Mixed)
  user: String,
  date: Date,
  status: String,
  history: String
*/

function createTable(event, callback){
	setTable(event, new Table(), callback);
}

function updateTable(event, callback){
	var table = Table.findById(event.data.tableId, function(err, table){
		//todo: error handling
		setTable(event, table, callback);
	})
}

function getTable(callback){
	var table = Table.findById(event.data.tableId, function(err, table){
		//todo: error handling
		callback(table);
	})
}

function setTable(event, table, callback) {
	table.name = event.data.tableName;
	table.fields = [];

	//todo: validate unique field names
	for (var i = event.data.fields.length - 1; i >= 0; i--) {
		var field = event.data.fields[i];
		//todo: validate type is a valid mongodb type or convert to valid mongodb type
		table.fields.push(field);
	};

	//todo: error handling
	table.save(function () {
		callback(table);
		saveEvent("created table: " + table.name);
	  });
}

function saveEvent(event, history) {
		event.status = "done";
		event.history = history;
		event.save();
}

exports.createTable = createTable;
exports.updateTable = updateTable;
exports.getTable = getTable;
