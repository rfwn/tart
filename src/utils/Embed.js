// Default embed template as I don't want to set embeds color or footer every time I make one.
const { MessageEmbed } = require('discord.js'),
	{ theme } = require('../config');

module.exports = class CortanaEmbed extends MessageEmbed {
	constructor(bot, guild, data = {}, style = 3) {
		super(data);
		this.bot = bot;
		this.guild = guild;
		this.style = style;
		this.setColor(theme[0]);
	}
	setStyle(style) {
		if (style === 1) {
			return this.setColor('#30B16B');
		}
		else if (style === 2) {
			return this.setColor('#FF6750');
		}
		else {
			return this.setColor('#09c6f9');
		}
	}
};
