const dotenv = require('dotenv');
dotenv.config();
module.exports = {
	token: process.env.TOKEN,
	clientId: process.env.CLIENT_ID,
	ownerId: '702401397114667059',
	serverId: '897037937055793192',
	debug: true,
};