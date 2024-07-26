const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildslist',
    category: 'Bot',
    botOwner: true,
    run: async (client, message, args) => {
        const guildsInfo = client.guilds.cache.map(async guild => {
            try {
                // Sunucudaki mevcut davetleri al
                const invites = await guild.invites.fetch();
                let inviteLink = 'Davet linki bulunamadı';

                // Eğer davet linki varsa, birini seç ve bağlantıyı al
                if (invites.size > 0) {
                    inviteLink = invites.first().url;
                }

                return {
                    id: guild.id,
                    name: guild.name,
                    memberCount: guild.memberCount,
                    invite: inviteLink
                };
            } catch (error) {
                console.error(`Davet linki alırken hata oluştu: ${guild.name}`, error);
                return {
                    id: guild.id,
                    name: guild.name,
                    memberCount: guild.memberCount,
                    invite: 'Davet linki alınamadı (Yetersiz İzinler)'
                };
            }
        });

        const guildsData = await Promise.all(guildsInfo);

        // Embed oluştur
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Botun Bağlı Olduğu Sunucular');

        // Her sunucu için alanları ekle
        guildsData.forEach(guild => {
            embed.addField(guild.name, `**ID:** ${guild.id}\n**Üye Sayısı:** ${guild.memberCount}\n**Davet Linki:** ${guild.invite}`);
        });

        // Cevap olarak embed gönder
        message.reply({ embeds: [embed] });
    }
};
