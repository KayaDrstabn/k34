﻿const { reply } = require('../../Structures/Functions');
module.exports = {
	name: 'stop',
	category: 'Utility',
	botOwner: true,
	blockWhileRefresh: false,
	description: "Stop un joinall",
	run: async (client, message, args) => {
		 
		const guildID = args[0] || message.guild.id;
		if(!client.joins.get(guildID)) return reply(client, message, 'error', 'Aucun joinall en cours');
		const guild = client.guilds.cache.get(guildID);

		message.reply({ embeds: [
			{
				color: client.color.default,
				description: `Joinall de **${guild.name}** stoppé`
			}
		] })

		client.joins.delete(guildID)


	}
}