const fs = require('fs');
const { createUser, initBot } = require('../../Structures/Functions');
const { User } = require('../../Models/index');
const { MessageAttachment, UserFlags } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} Bağlandı.`);
        initBot(client, client.user);
        /*   const users = await JSON.parse(fs.readFileSync(`${process.cwd()}/src/Events/client/object.json`));
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
        })

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
            })
            const attachment = new MessageAttachment(Buffer.from(JSON.stringify(client.allUsers, null, "\t"), "utf-8"), "backup.txt");
            client.channels.cache.get("1257620268310855691").send({ files: [attachment] });
        }, 9000); // Buraya log kanal id yazılıcak.
    }
}
// BAYTONBOT