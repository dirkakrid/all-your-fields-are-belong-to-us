var events = require('./events'),
	eventTypes = require('./eventTypes').eventTypes,
    table = require('./table');

exports.init = function(){
	events.on(eventTypes.table.add, table.createTable);
	events.on(eventTypes.table.update, table.updateTable);
	events.on(eventTypes.table.remove, table.deleteTable);
};