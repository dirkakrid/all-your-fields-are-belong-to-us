var mongoose = require('mongoose/');

// Create a schema for our data
var TableSchema = new mongoose.Schema({
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

function createTable(event){
	setTable(event, new Table());
}

function updateTable(event){
	var table = Table.findById(event.data.tableId, function(err, table){
		//todo: error handling
		setTable(event, table);
	})
}

function deleteTable(event){
	Table.remove({id: event.data.tableId}, null);
}

function getTable(callback){
	var table = Table.findById(event.data.tableId, function(err, table){
		//todo: error handling
		callback(err, table);
	})
}

function setTable(event, table) {
	console.log(event);
	console.log(table);
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
		updateEventStatus(event, "created table: " + table.name);
	  });
}

function updateEventStatus(event, history) {
		event.status = "done";
		event.history = history;
		event.save();
}

exports.createTable = createTable;
exports.updateTable = updateTable;
exports.getTable = getTable;
exports.deleteTable = deleteTable;
