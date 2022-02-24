// Default embed template as I don't want to set embeds color or footer every time I make one.
const { MessageEmbed } = require('discord.js');

module.exports = class TartEmbed extends MessageEmbed {
	constructor(bot, guild, data = {}, style = 3) {
		super(data);
		this.bot = bot;
		this.guild = guild;
		this.style = style;
		this.setColor('#550000');
	}
};
