// This file
const { Client, Collection } = require('discord.js');

module.exports = class Tart extends Client {
	constructor(options) {
		super(options);
		this.logger = require('../utils/Logger');

		this.commands = new Collection();

		this.config = require('../config.js');

		this.registerCommands = require('../scripts/register-slash-commands');

		this.delay = ms => new Promise(res => setTimeout(res, ms));
	}
};
