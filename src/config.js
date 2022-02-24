const dotenv = require('dotenv');
dotenv.config();
module.exports = {
	token: process.env.TOKEN,
	clientId: process.env.CLIENT_ID,
	ownerId: process.env.OWNER_ID,
	serverId: process.env.SERVER_ID,
	debug: true,
};