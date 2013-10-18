var mongoose = require('../mongodb'),
	util = require('util');

// Create a schema for our data
var FieldSchema = new mongoose.Schema({
  	id: String,
  	name: String,
  	type: String 
});

var TableSchema = new mongoose.Schema({
  name: String,
  fields: [FieldSchema],
  version: String
});

var Table = mongoose.model('Tables', TableSchema);

/*
  type: String, 
  data: {}, //schemaless (i.e. Mixed)
  user: String,
  date: Date,
  status: String,
  history: String,
  ref: String
*/

function createTable(event){
	setTable(event, new Table());
}

function updateTable(event){
	var table = Table.findById(event.data.id, function(err, table){
		//todo: error handling
		setTable(event, table);
	})
}

function deleteTable(event){
	Table.remove({id: event.data.id}, function(err, table){
		updateEventStatus(event, 
			err,
			"created table: " + table.name,
			"/tables/" + table.id);
	});
}

function getOne(id, callback){
	Table.findById(id, callback);
}

function getAll(callback){
	Table.find().sort('name', 1).execFind(callback);
}

function setTable(event, table) {
	table.name = event.data.name;
	table.fields = [];

	//todo: validate unique field names
	for (var i = event.data.fields.length - 1; i >= 0; i--) {
		var field = event.data.fields[i];
		//todo: validate type is a valid mongodb type or convert to valid mongodb type
		table.fields.push(field);
	};

	//todo: error handling
	table.save(function (err) {
		updateEventStatus(event, 
			err,
			"created table: " + table.name,
			"/tables/" + table.id);
	  });
}

function updateEventStatus(event, err, history, ref) {
		event.status = util.format("%j", err) || "done";
		event.history = history;
		event.ref = ref;
		event.save();
}

exports.createTable = createTable;
exports.updateTable = updateTable;
exports.deleteTable = deleteTable;

exports.getOne = getOne;
exports.getAll = getAll;
