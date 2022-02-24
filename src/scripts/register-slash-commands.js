const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
module.exports = async (bot) => {
	// Get info from config
	const { token, clientId, serverId } = bot.config;

	// Initial commands
	const commands = [];

	// Load commands and save'em in commands array
	const commandFolders = await fs.readdirSync('./src/commands');
	for (const folder of commandFolders) {
		const commandFiles = await fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`../commands/${folder}/${file}`);
			commands.push(command.data.toJSON());
		}
	}

	// No idea how discord's REST works
	const rest = new REST({ version: '9' }).setToken(token);

	(async () => {
		try {
			bot.logger.log('Started refreshing application (/) commands.');

			// Registering commands
			await rest.put(
				// For a single server (dev status)
				Routes.applicationGuildCommands(clientId, serverId),
				// If u want global commands
				// Routes.applicationCommands(clientId),
				{ body: commands },
			);

			bot.logger.ready('Successfully reloaded application (/) commands.');
		}
		catch (error) {
			bot.logger.error(error);
		}
	})();
};