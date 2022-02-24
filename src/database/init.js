const db = require('mongoose');

module.exports = {
	init: (bot) => {
		const dbOptions = {
			useNewUrlParser: true,
			autoIndex: false,
			maxPoolSize: 5,
			connectTimeoutMS: 10000,
			family: 4,
			useUnifiedTopology: true,
		};
		db.connect(bot.config.MongoDBURl, dbOptions);
		db.Promise = global.Promise;
		db.connection.on('connected', () => {
			bot.logger.ready('Database successfully connected');
		});
		db.connection.on('err', (err) => {
			bot.logger.error(`Database has encountered an error: \n ${err.stack}`);
		});
		db.connection.on('disconnected', () => {
			bot.logger.error('Database disconnected');
		});
	},
	async ping() {
		const currentNano = process.hrtime();
		await db.connection.db.command({ ping: 1 });
		const time = process.hrtime(currentNano);
		return (time[0] * 1e9 + time[1]) * 1e-6;
	},
};
