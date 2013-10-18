var mongoose = require('mongoose');
var config = require('./config');

var mongodbPort = process.env.PORT || 8888;
var mongoURI = ( process.env.PORT ) 
	? config.creds.mongoose_auth_mongohq 
	: config.creds.mongoose_auth_local;

function connect(){
	mongoose.connect(mongoURI);
}

exports.connect = connect;