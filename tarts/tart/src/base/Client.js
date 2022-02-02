// Dependencies
const { Client, Collection, Intents } = require('discord.js');

/**
 * Modified custom client
 * @extends {Client}
*/
class CustomClient extends Client {
	constructor() {
		super({
			allowedMentions: { parse: ['users'] },
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_BANS,
				Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
				Intents.FLAGS.GUILD_INTEGRATIONS,
				Intents.FLAGS.GUILD_WEBHOOKS,
				Intents.FLAGS.GUILD_INVITES,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.GUILD_PRESENCES,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
			],
			presence: {
				status: 'online',
				activities: [{
					name: 'Winston\'s word',
					type: 'LISTENING',
				}],
			},
		});

		/**
		 * The logger file
		 * @type {function}
		*/
		this.logger = require('../utils/Logger');

		/**
		 * The command data
		 * @type {Collection}
		 * @type {Collection}
		*/
		this.commands = new Collection();

		/**
		 * The config file
		 * @type {object}
		*/
		this.config = require('../config.js');

		/**
		 * Basic statistics for the bot
		 * @type {number}
		*/
		this.commandsUsed = 0;

		/**
		 * The custom emojis the bot uses.
		 * @type {object}
		*/
		this.customEmojis = require('../assets/json/emojis.json');

		/**
		 * Function for waiting. (acts like a pause)
		 * @param {number} ms How long to wait
		 * @type {function}
		*/
		this.delay = ms => new Promise(res => setTimeout(res, ms));

	}
}

module.exports = CustomClient;