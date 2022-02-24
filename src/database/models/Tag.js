const { Schema, model } = require('mongoose');
const timestamps = require('mongoose-timestamp');

const tagSchema = Schema({
	slug: String,
	content: String,
	guildId: String,
});

tagSchema.plugin(timestamps);

module.exports = model('tags', tagSchema);
