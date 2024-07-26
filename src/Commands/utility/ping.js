const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'Bot',
    botOwner: true,
    run: async (client, message, args) => {
        const startTime = Date.now();
        const msg = await message.reply('Ping bilgileri alınıyor...');

        // Bot gecikme süresi
        const botLatency = msg.createdTimestamp - message.createdTimestamp;
        // Discord API gecikme süresi
        const apiLatency = Math.round(client.ws.ping);

        // Mesaj gönderme gecikme süresi
        const editStartTime = Date.now();
        await msg.edit('Ping bilgileri alınıyor...');
        const messageSendLatency = Date.now() - editStartTime;

        // Mevcut saat bilgisini al
        const currentTime = new Date().toLocaleString();

        // Embed oluştur
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Ping Bilgileri')
            .addField('Bot Gecikmesi', `${botLatency}ms`, false)
            .addField('API Gecikmesi', `${apiLatency}ms`, false)
            .addField('Mesaj Gönderme Gecikmesi', `${messageSendLatency}ms`, false)
            .setFooter(`Saat: ${currentTime}`)
            .setTimestamp();

        // Cevap olarak embed gönder
        msg.edit({ content: ' ', embeds: [embed] });
    }
};
