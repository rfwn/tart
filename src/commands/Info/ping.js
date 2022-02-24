const { SlashCommandBuilder } = require('@discordjs/builders'),
	{ Embed } = require('../../utils/');
module.exports = {
	// Due to slash commands, We store these in data
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDefaultPermission(true)
		.setDescription('Shows the bot ping.'),
	dir: __dirname,
	async execute(bot, interaction) {
		// I love these stupid cute creatures
		const m = await interaction.channel.send('https://media.discordapp.net/attachments/741696928957464720/829708526304886844/1.gif');
		const messageTimestamp = m.createdTimestamp;
		// Sorry but we don't need you anymore
		m.delete();
		const embed = new Embed()
			.addField('🏓 Ping', `> \`${messageTimestamp - interaction.createdTimestamp}ms\``, true)
			.addField('⌛ API Latency', `> \`${Math.round(bot.ws.ping)}ms\``, true)
			.addField('📂 Database', `> \`${Math.round(await bot.database.ping())}ms\``, true)
			.setTimestamp();
		await interaction.reply({ embeds: [embed] });
	},
};