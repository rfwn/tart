const watch = require('node-watch'),
	path = require('path');

module.exports = (bot, dir) => {
	watch(dir, { recursive: true, filter: /\.js$/ }, function(evt, name) {
		if (evt === 'update') {
			const cmdName = name.split('\\')[3].substring(0, name.split('\\')[3].length - 3);
			const cmd = bot.commands.get(cmdName);

			try {
				delete require.cache[require.resolve(`${cmd.dir}${path.sep}${cmd.data.name}`)];
				const newCommand = require(`${cmd.dir}${path.sep}${cmd.data.name}`);
				bot.commands.set(newCommand.data.name, newCommand);
				bot.logger.log(`Autoreloaded Command: ${cmdName}`);
			}
			catch {
				bot.logger.log(`Error accured while autoreloading Command: ${cmdName}`);
			}
		}
	});
};
