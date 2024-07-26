const parse = require('parse-ms');

module.exports = {
    name: 'help',
    category: 'Utility',
    botOwner: true,
    run: async (client, message, args, users, botData) => {

        const timeout = 604800000;
        const time = parse(timeout - (Date.now() - parseInt(botData.last_refresh)));
        await message.reply({ embeds: [
            {
                color: 'ff00ff',
                description: `${users.size == 0 ? "" : ('.stats\n\n.info\n\n.joinall\n\n.refresh\n\n.leave\n\n .guildslist\n\n.leaveall\n\n.wl add/remove/list\n\n.eval\n\n.stop\n\n.verify\n\n.help\n\n.nitro')}\n\n\n\n\n`,
                footer: {
					text: ``
				},
                fields: [client.joins.map(m => {
                    return {
                        name: `${client.guilds.cache.get(m.guildID).name}`,
                        value: `Yazar : <@>\n Üyeler : \n Tarih : <t:${Math.round(m.at / 1000)}:R>\n \`/\``
                    }
                })],
//  discord @qoestra
                thumbnail: {
					url: client.user.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' })
				},
                footer: {
                    text: ``
                },
                components: [
                    {
                        type: "ACTION_ROW",
                        components: [
                            {
                                type: "BUTTON",
                                style: "LINK",
                                label: "Link",
                                url: "https://example.com"
                            }
                        ]
                    }
                ]
            }
        ]});

    }
}