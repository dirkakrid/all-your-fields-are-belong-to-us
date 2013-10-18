var events = require('../eventEmitter'),
	eventTypes = require('../eventTypes'),
    repo = require('./tableRowRepo');

events.on(eventTypes.tableRow.add, repo.createTableRow);
events.on(eventTypes.tableRow.update, repo.updateTableRow);
events.on(eventTypes.tableRow.remove, repo.deleteTableRow);