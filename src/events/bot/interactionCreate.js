const Event = require('../../structures/Event');

module.exports = class InteractionCreate extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		});
	}

	async run(bot, interaction) {
		if (!interaction.isCommand()) return;

		if (!bot.commands.has(interaction.commandName)) return;

		try {
			await bot.commands.get(interaction.commandName).execute(bot, interaction);
		}
		catch (error) {
			bot.logger.error(`Command ${interaction.commandName} has an error: ${error.message}`);
			if (bot.config.debug) {
				console.log(error);
			}
			await interaction.reply({ content: 'This command has an error, please try again. (If you are consistently observing this error please contact support)', ephemeral: true });
		}
	}
};
