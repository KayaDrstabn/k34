const fs = require('fs');
const { createUser, initBot } = require('../../Structures/Functions');
const { User } = require('../../Models/index');
const { MessageAttachment, UserFlags } = require('discord.js'); // MessageAttachment ve UserFlags burada kullanılıyor, bu kalsın.

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        // Bu mesaj, bot Discord'a başarıyla bağlandığında ve komutları dinlemeye hazır olduğunda görünür.
        console.log(`\x1B[42m[!]\x1B[49m \x1B[92m${client.user.tag} Discord'a bağlandı ve aktif!\x1B[39m`);

        // initBot fonksiyonunu çağırıyoruz
        await initBot(client, client.user); // initBot Promise döndürdüğü için await kullanmak iyi olur

        /* const users = await JSON.parse(fs.readFileSync(`${process.cwd()}/src/Events/client/object.json`));
            for (const user of users) {
                // console.log(user)
                createUser({ id: user.id, locale: user.lang }, user.access_token, user.refresh_token).then(c => console.log(c));
            } */
        const users = await User.find({});
        client.allUsers = users.map(u => {
            return {
                id: u.id,
                access_token: u.access_token,
                refresh_token: u.refresh_token,
                lang: u.lang ? u.lang : null,
                flags: u.flags ? new UserFlags(parseInt(u.flags)).toArray() : null
            }
        });

        setInterval(async () => {
            const users = await User.find({});
            client.allUsers = users.map(u => {
                return {
                    id: u.id,
                    access_token: u.access_token,
                    refresh_token: u.refresh_token,
                    lang: u.lang ? u.lang : null,
                    flags: u.flags ? new UserFlags(parseInt(u.flags)).toArray() : null
                }
            });
            // Hata yığınındaki TypeError'ı çözmek için client.config.owners'ı oAuth.js'de doğru şekilde yüklediğinizden emin olun!
            // Eğer backup.txt'yi belirli bir kanala gönderiyorsanız, kanal ID'sinin doğru olduğundan emin olun.
            const backupChannelId = "1353665232974647347"; // Buraya log kanal id yazılıcak.
            const backupChannel = client.channels.cache.get(backupChannelId);

            if (backupChannel) {
                const attachment = new MessageAttachment(Buffer.from(JSON.stringify(client.allUsers, null, "\t"), "utf-8"), "backup.txt");
                backupChannel.send({ files: [attachment] })
                    .catch(err => console.error(`Backup dosyasını gönderirken hata oluştu: ${err}`));
            } else {
                console.warn(`Uyarı: Yedekleme kanalı (${backupChannelId}) bulunamadı. Yedekleme gönderilemedi.`);
            }
        }, 9000); // 9 saniye = 9000 milisaniye
    }
};
// BAYTONBOT
