const parse = require('parse-ms');

module.exports = {
	name: 'info',
	category: 'Utility',
	botOwner: true,
	run: (client, message, args, users, botData) => {

		const timeout = 604800000;
		const time = parse(timeout - (Date.now() - parseInt(botData.last_refresh)));
		message.channel.send({ embeds: [
			{
				color: client.color.default,
        //				description: `**${client.emoji.arrow} Toplam Üye : \`${client.config.ez}${users.size == 0 ? "Yükleniyor..." : users.length.toLocaleString('en-US')}\`\n\n${client.emoji.arrow} Yetkilendirme Bağlantısı : [Link](${client.config.authlink})\n${client.emoji.arrow} Davet Bağlantısı : [Link](${client.config.botlink})\n\n${client.emoji.arrow} Sazanlar geliyor...**`,
				//description: `**${client.emoji.arrow} Toplam Üye : \`${users.size == 0 ? "Yükleniyor..." : users.length.toLocaleString('en-US')}\`\n\n${client.emoji.arrow} Yetkilendirme Bağlantısı : [Link](${client.config.authlink})\n${client.emoji.arrow} Davet Bağlantısı : [Link](${client.config.botlink})\n\n${client.emoji.arrow} Sazanlar geliyor...**`,
        description: `**<:baytontotal:1254814317220724797>  Toplam Üye : \`${users.size == 0 ? "Yükleniyor..." : users.length.toLocaleString('en-US')}\`\n\n<:baytonbaglantisaa:1255607867277443177> Yetkilendirme Bağlantısı : [Link](${client.config.authlink})\n<:baytonbaglanti:1255608145154412605> Davet Bağlantısı : [Link](${client.config.botlink})\n\n<a:baytonsazan:1255608568078401724> Sazanlar geliyor...**`,
				fields: [client.joins.map(m => {
					return {
						name: `${client.guilds.cache.get(m.guildID).name}`,
						value: `${client.emoji.author} Yetkili : <@${m.author}>\n${client.emoji.member} Üyeler : \`${m.members}\`\n${client.emoji.date} Date : <t:${Math.round(m.at / 1000)}:R>\n${client.emoji.progress} İşlem devam ediyor. : \`${m.progress}/${users.length}\``
					}
				})],
				thumbnail: {
					url: client.user.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' })
				},
				footer: {
					text: `Sonraki Yenileme Tarihi: ${time.days} Gün, ${time.hours} Saat, ${time.minutes} Dakika`
				},
        
			}
		]})

	}
}