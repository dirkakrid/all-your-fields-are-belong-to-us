var mongoose = require('../mongodb'),
	events = require('../eventEmitter');


// Create a schema for our data
var MessageSchema = new mongoose.Schema({
  type: String, //add-table, update-table, delete-table, add-row, update-row, delete-row
  data: {}, //schemaless (i.e. Mixed)
  user: String,
  date: Date,
  status: String, //pending, done
  history: String //for audit.  i.e. allen added table ....
});


// Use the schema to register a model
var Message = mongoose.model('Events', MessageSchema);

var getAll = function(callback) {
  Message.find().sort('date', -1).execFind(callback);
};

var publish = function(user, type, data, callback) {
  // Create a new message model, fill it up and save it to Mongodb
  var message = new Message(); 
  message.user = user;
  message.type = type;
  message.data = data;
  message.date = new Date();
  message.status = "pending";
  message.save(function (err, result) {
    console.log('emit event ', message.type);
    events.emit(message.type, message);
    callback(err, {
      eventid: result.id
    });
  });
};

exports.getAll = getAll;
exports.publish = publish;