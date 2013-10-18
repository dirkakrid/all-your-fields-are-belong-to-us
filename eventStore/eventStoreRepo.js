var mongoose = require('../mongodb'),
	events = require('../eventEmitter');


// Create a schema for our data
var EventSchema = new mongoose.Schema({
  type: String, //add-table, update-table, delete-table, add-row, update-row, delete-row
  data: {}, //schemaless (i.e. Mixed)
  user: String,
  date: Date,
  status: String, //pending, done
  history: String //for audit.  i.e. allen added table ....
});


// Use the schema to register a model
var Event = mongoose.model('Events', EventSchema);

var getAll = function(callback) {
  Event.find().sort('date', -1).execFind(callback);
};

var getOne = function(id, callback){
  Event.findById(id, callback);
}

var publish = function(user, type, data, callback) {
  // Create a new event model, fill it up and save it to Mongodb
  var cmd = new Event(); 
  cmd.user = user;
  cmd.type = type;
  cmd.data = data;
  cmd.date = new Date();
  cmd.status = "pending";
  cmd.save(function (err, result) {
    console.log('emit event ', cmd.type);
    events.emit(cmd.type, cmd);
    callback(err, {
      eventid: result.id
    });
  });
};

exports.getAll = getAll;
exports.getOne = getOne;
exports.publish = publish;