const	Event = require('../../structures/Event');

module.exports = class Error extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		});
	}

	async run(bot, err) {
		bot.logger.error(`Bot encountered an error: ${err.message}.`);
		if (bot.debug) console.log(err);
	}
};
