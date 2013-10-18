var events = require('../eventEmitter'),
	eventTypes = require('../eventTypes'),
    repo = require('./tableRepo');

events.on(eventTypes.table.add, repo.createTable);
events.on(eventTypes.table.update, repo.updateTable);
events.on(eventTypes.table.remove, repo.deleteTable);