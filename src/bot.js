// Main File for the bot
// Dependencies
const Client = require('./base/Client'),
	{ Intents } = require('discord.js'),
	fs = require('fs'),
	path = require('path');

const bot = new Client({
	allowedMentions: { parse: ['users'] },
	intents: [
		// May need these?
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
			// Never gonna forget you
			name: 'everybody gangsta untill I change this',
			type: 'LISTENING',
		}],
	},
});

// Register slash commands
(async () => {
	await bot.registerCommands(bot);
})();

// Load command files
const commandFolders = fs.readdirSync('./src/commands');
bot.logger.log(`=-=-=-=-=-=-=- Loading commands: ${commandFolders.length} Categories -=-=-=-=-=-=-=`);
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		bot.logger.log(`Loading command: ${command.data.name}`);
		bot.commands.set(command.data.name, command);
	}
}

// Load events (Its structure is different from commands)
bot.logger.log(`=-=-=-=-=-=-=- Loaded ${bot.commands.size} Commands -=-=-=-=-=-=-=`);
const eventFolders = fs.readdirSync('./src/events/');
bot.logger.log(`=-=-=-=-=-=-=- Loading events: ${eventFolders.length} Categories -=-=-=-=-=-=-=`);
eventFolders.forEach(async folder => {
	const folders = fs.readdirSync('./src/events/' + folder + '/');
	folders.forEach(async file => {
		delete require.cache[file];
		const { name } = path.parse(file);
		try {
			const event = new (require(`./events/${folder}/${file}`))(bot, name);
			bot.logger.log(`Loading Event: ${name}`);
			bot.on(name, (...args) => event.run(bot, ...args));
		}
		catch (err) {
			bot.logger.error(`Failed to load Event: ${name} error: ${err.message}`);
		}
	});
});
bot.logger.log(`=-=-=-=-=-=-=- Loaded ${(Object.keys(bot._events).length)} Events -=-=-=-=-=-=-=`);

// We don't want the bot crash on every error
process.on('unhandledRejection', err => {
	bot.logger.error(`Unhandled promise rejection: ${err.message}.`);
	console.log(err);
});

// Logging to bot and making it online
bot.login(bot.config.token);