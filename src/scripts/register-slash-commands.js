const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
module.exports = async (bot) => {
	// Get info from config
	const { token, clientId } = bot.config;

	// Initial commands
	const commands = [];
	const baseCommand = [{
		'name': 'logitary',
		'description': 'Logitary is a full featured bot that logs everything for your server.',
		'options': [],
	}];
	// const ownerGuildCommands = [{
	// 	'name': 'logitary',
	// 	'description': 'Logitary is a full featured bot that logs everything for your server.',
	// 	'options': [],
	// }];

	// Load commands and save'em in commands array
	const commandFolders = await fs.readdirSync('./src/commands');
	for (const folder of commandFolders) {
		const commandFiles = await fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`../commands/${folder}/${file}`);
			commands.push(command.data.toJSON());
		}
	}
	commands.forEach(command => {
		const commandObj = {
			'type': 1,
			...command,
		};
		if (command['name'] === 'channel') {
			commandObj.options[1] = {
				...commandObj.options[1],
				'channel_types': [0],
			};
		}
		if (command['name'] === 'reload') {
			// commandObj.default_permission = false;
			baseCommand[0]['options'].push(commandObj);
		}
		else if (command['name'] === 'ping') {
			// commandObj.default_permission = false;
			baseCommand[0]['options'].push(commandObj);
		}
		else {
			// commandObj.default_permission = true;
			baseCommand[0]['options'].push(commandObj);
		}
	});
	// console.log(JSON.stringify(baseCommand))
	// No idea how discord's REST works (and ignore upper line)
	const rest = new REST({ version: '9' }).setToken(token);

	(async () => {
		try {
			bot.logger.log('Started refreshing application (/) commands.');

			// Registering commands
			await rest.put(
				Routes.applicationCommands(clientId),
				{ body: [] },
			);
			await rest.put(
				Routes.applicationGuildCommands(clientId, '897037937055793192'),
				{ body: baseCommand },
			);

			bot.logger.ready('Successfully reloaded application (/) commands.');
		}
		catch (error) {
			bot.logger.error(error);
		}
	})();
};