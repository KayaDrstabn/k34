module.exports = {
    name: 'leaveall',
    category: 'Bot',
    botOwner: true,
    run: async (client, message, args) => {
       
        client.guilds.cache.forEach(guild => {
            guild.leave();
        });

        message.reply('Tüm sunuculardan ayrıldım.');
    }
}