const { WL } = require('../../Models/index');
const { addWL, removeWL } = require('../../Structures/Functions');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'wl',
    category: 'Utility',
    ownerOnly: true,
    run: async (client, message, args) => {

        if (!args[0] || !["add", "remove", "list"].includes(args[0])) return message.channel.send('Kullanım: wl (add/remove/list)');

        const whitelistUser = message.mentions.users.first() || await client.users.fetch(args[1]).catch(() => null);
        if (!whitelistUser && args[0] !== "list") return message.reply("Geçersiz kullanıcı");

        let wlData;

        if (whitelistUser) {
            wlData = await WL.findOne({ id: whitelistUser.id });
        }

        const embed = new MessageEmbed()
            .setColor('#0c3a9e')
            .setThumbnail(client.user.displayAvatarURL()) // Botun profil fotosunu embed'e ekler

        switch (args[0]) {

            case "list": {
                const list = await WL.find({});
                if (list.length === 0) {
                    embed.setDescription("Beyaz listede hiç kullanıcı yok.");
                } else {
                    const userList = list.map((user, index) => `<@${user.id}> id: (${user.id})`).join('\n');
                    embed.setDescription(`**Kullanıcılar**\n${userList}`);
                }

                message.channel.send({ embeds: [embed] });
                break;
            }

            case "add": {
                if (wlData) return message.reply("Kullanıcı zaten beyaz listede.");

                addWL(whitelistUser);
                message.channel.send("Kullanıcı beyaz listeye eklendi.");

                setTimeout(async () => {
                    const updatedListAdd = await WL.find({});
                    if (updatedListAdd.length === 0) {
                        embed.setDescription("Beyaz listede hiç kullanıcı yok.");
                    } else {
                        const userListAdd = updatedListAdd.map((user, index) => `<@${user.id}> id: (${user.id})`).join('\n');
                        embed.setDescription(`**Güncellenmiş Beyaz Liste Kullanıcıları**\n${userListAdd}`);
                    }

                    message.channel.send({ embeds: [embed] });
                }, 5000); // 8 saniye bekleme süresi
                break;
            }

            case "remove": {
                if (!wlData) return message.reply("Kullanıcı beyaz listede zaten mevcut değil.");

                removeWL(whitelistUser);
                message.channel.send("Kullanıcı beyaz listeden çıkarıldı.");

                setTimeout(async () => {
                    const updatedListRemove = await WL.find({});
                    if (updatedListRemove.length === 0) {
                        embed.setDescription("Beyaz listede hiç kullanıcı yok.");
                    } else {
                        const userListRemove = updatedListRemove.map((user, index) => `<@${user.id}> id: (${user.id})`).join('\n');
                        embed.setDescription(`**Güncellenmiş Beyaz Liste Kullanıcıları**\n${userListRemove}`);
                    }

                    message.channel.send({ embeds: [embed] });
                }, 5000); // 8 saniye bekleme süresi
                break;
            }
        }

    }
};
