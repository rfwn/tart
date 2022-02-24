const { SlashCommandBuilder } = require('@discordjs/builders'),
	{ tagSchema } = require('../../database/models');
module.exports = {
	// Due to slash commands, We store these in data
	data: new SlashCommandBuilder()
		.setName('tag')
		.setDefaultPermission(true)
		.setDescription('Manage some tags.')
		.addSubcommand(subCommand =>
			subCommand
				.setName('create')
				.setDescription('Create a tag.')
				.addStringOption(option =>
					option
						.setName('slug')
						.setRequired(true)
						.setDescription('SLUG'),
				)
				.addStringOption(option =>
					option
						.setName('content')
						.setRequired(true)
						.setDescription('yea'),
				),
		)
		.addSubcommand(subCommand =>
			subCommand
				.setName('get')
				.setDescription('Get a tag.')
				.addStringOption(option =>
					option
						.setName('slug')
						.setRequired(true)
						.setDescription('yea'),
				),
		)
		.addSubcommand(subCommand =>
			subCommand
				.setName('delete')
				.setDescription('Delete a tag.')
				.addStringOption(option =>
					option
						.setName('slug')
						.setRequired(true)
						.setDescription('yea'),
				),
		)
		.addSubcommand(subCommand => subCommand.setName('list').setDescription('View tags.')),
	dir: __dirname,
	async execute(bot, interaction) {
		if (interaction.options.getSubcommand() === 'get') {
			const slug = interaction.options.getString('slug');

			tagSchema.findOne({ guildId: interaction.guild.id, slug: slug }, (err, tag) => {
				if (!tag) return interaction.reply('Tag not found.');
				else return interaction.reply(tag.content);
			});
		}
		if (interaction.options.getSubcommand() === 'create') {
			const slug = interaction.options.getString('slug');
			const content = interaction.options.getString('content');
			const newTag = new tagSchema({
				guildId: interaction.guild.id, slug: slug, content: content,
			});
			newTag.save().then(() => {
				interaction.reply('Tag created');
			}).catch(err => {
				console.log(err);
				interaction.reply('Error while creating tag');
			});
		}
		if (interaction.options.getSubcommand() === 'delete') {
			const slug = interaction.options.getString('slug');
			tagSchema.findOne({ guildId: interaction.guild.id, slug: slug }, (err, tag) => {
				if (!tag) return interaction.reply('Tag not found.');
				tagSchema.deleteOne({ guildId: interaction.guild.id, slug: slug })
					.then(() => interaction.reply('Tag Deleted'))
					.catch(err => {
						console.log(err);
						interaction.reply('Error while deleting tag');
					});
			});


		}
		else if (interaction.options.getSubcommand() === 'list') {
			tagSchema.find({ guildId: interaction.guild.id }, (err, tags) => {
				if (tags.length === 0) return interaction.reply('No tags');
				else return interaction.reply(tags.map(t => `${t.slug} - ${t.content}`).join('\n'));
			});
		}
	},
};