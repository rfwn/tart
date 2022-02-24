// Import Logger Module
const { logger } = require('./utils');

// Promise-based functions
(async function load() {

	// Import Sharding manager from discord library
	const { ShardingManager } = require('discord.js');

	// Configure Sharding manager
	const manager = new ShardingManager('./src/bot.js', {
		totalShards: 'auto',
		token: require('./config.js').token,
	});

	// Start bot
	manager.spawn().then(logger.log('=-=-=-=-=-=-=- Loading shard(s) -=-=-=-=-=-=-='));

	// Shard creation event
	manager.on('shardCreate', (shard) => {
		logger.log(`Shard ${shard.id} launched`);
	});
})();
