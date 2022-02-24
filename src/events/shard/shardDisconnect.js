const Event = require('../../structures/Event');

module.exports = class shardDisconnect extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		});
	}

	async run(bot, event, shardID) {
		bot.logger.error(`Shard: ${shardID} disconnected with error: ${event.reason}`);
	}
};
