const path = require('path');

// Events structure class
module.exports = class Event {
	constructor(bot, name, {
		dirname = false,
	}) {
		// Category of event
		const category = (dirname ? dirname.split(path.sep)[parseInt(dirname.split(path.sep).length - 1, 10)] : 'Other');
		this.conf = { name, category };
	}

	// Default run method for events (If theres no run method declared in event file.)
	// eslint-disable-next-line no-unused-vars
	async run(...args) {
		throw new Error(`Event: ${this.name} does not have a run method`);
	}
};
