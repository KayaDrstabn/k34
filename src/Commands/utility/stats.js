const languages = [
  { name: "Amerika, Birleşik Devletler", key: "en-US", flag: "🇺🇸" },
  { name: "Hindistan", key: "hi", flag: "🇮🇳" },
  { name: "Amerika, Birleşik Krallık", key: "en-GB", flag: "🇬🇧" },
  { name: "Portekiz", key: "pt-BR", flag: "🇵🇹" },
  { name: "Romanya", key: "ro", flag: "🇷🇴" },
  { name: "Türkiye", key: "tr", flag: "🇹🇷" },
  { name: "Fransa", key: "fr", flag: "🇫🇷" },
  { name: "İspanya", key: "es-ES", flag: "🇪🇸" },
  { name: "Rusya", key: "ru", flag: "🇷🇺" },
  { name: "Ukrayna", key: "uk", flag: "🇺🇦" },
  { name: "Almanya", key: "de", flag: "🇩🇪" },
  { name: "Vietnam", key: "vi", flag: "🇻🇳" },
  { name: "Finlandiya", key: "fi", flag: "🇫🇮" },
  { name: "Bulgaristan", key: "bg", flag: "🇧🇬" },
  { name: "Polonya", key: "pl", flag: "🇵🇱" },
  { name: "Hollanda", key: "nl", flag: "🇳🇱" },
  { name: "Yunanistan", key: "el", flag: "🇬🇷" },
  { name: "Macaristan", key: "hu", flag: "🇭🇺" },
  { name: "Litvanya", key: "lt", flag: "🇱🇹" },
  { name: "İtalya", key: "it", flag: "🇮🇹" },
  { name: "Tayland", key: "th", flag: "🇹🇭" },
  { name: "Çin, Tayvan", key: "zh-TW", flag: "🇹🇼" },
  { name: "Hırvatistan", key: "hr", flag: "🇭🇷" },
  { name: "İsveç", key: "sv-SE", flag: "🇸🇪" },
  { name: "Japonya", key: "ja", flag: "🇯🇵" },
  { name: "Danimarka", key: "da", flag: "🇩🇰" },
  { name: "Çekya", key: "cs", flag: "🇨🇿" },
  { name: "Norveç", key: "no", flag: "🇳🇴" },
  { name: "Çin", key: "zh-CN", flag: "🇨🇳" },
  { name: "Kore", key: "ko", flag: "🇰🇷" },
];

module.exports = {
  name: 'stats',
  category: 'Utility',
  botOwner: true,
  run: (client, message, args, users, botData) => {


    if (users.size == 0) return message.reply('Henüz hazır değil.')

    function getCount(str) {
      return users.filter(u => u.flags && u.flags.includes(str)).length
      
    }

    const langMsg = languages.map(l => {
      return {
        flag: l.flag,
        name: l.name,
        count: users.filter(u => u.lang && u.lang === l.key).length,
        key: l.key
      }
    });

    let embed =
    {
      //title: `${client.emoji.arrow} Toplam Kullanıcı : \`${users.size == 0 ? "Yükleniyor..." : users.length.toLocaleString('en-US')}\``,
      //      title: `${client.emoji.arrow} Toplam Kullanıcı : \`${client.config.ez}${users.size == 0 ? "Yükleniyor..." : users.length.toLocaleString('en-US')}\``,
title: `<:baytontotal:1254814317220724797> Toplam Kullanıcı : \`${users.size == 0 ? "Yükleniyor..." : users.length.toLocaleString('en-US')}\``,
      color: client.color.default,
      fields: [],
      description: `** **`,
      thumbnail: {
        url: client.user.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' })
      }
      
    }

    /*  embed.fields.push({
        name: `**__Badges__**: `,
        value: `** **`,
        inline: false
                        },
  { name: `<:partner:1186038525058101389> Partner`, 
   value: `\`\`\`${getCount('PARTENERED_SERVER_OWNER')}\`\`\``,
  inline: true },
  { name: `<:moderator:1186038454308569098> Certified Moderator`, 
   value: `\`\`\`${getCount('DISCORD_CERTIFIED_MODERATOR')}\`\`\``,
  inline: true },
  { name: `<:bannerstory_hypesquad_activity:1186038362000326808> Hypesquad Events`, 
   value: `\`\`\`${getCount('HYPESQUAD_EVENTS')}\`\`\``,
  inline: true },
  { name: `<:bug_hunter:1186038410247413860> Bug Hunter`, 
   value: `\`\`\`${getCount('BUGHUNTER_LEVEL_2') + getCount('BUGHUNTER_LEVEL_1')}\`\`\``,
  inline: true },
  { name: `<:hypesquad_bravery:1186038290940436590> Bravery`, 
   value: `\`\`\`${getCount('HOUSE_BRAVERY')}\`\`\``,
  inline: true },
  { name: `<:hypesquad_brilliance:1186038333961412608> Brilliance`, 
   value: `\`\`\`${getCount('HOUSE_BRILLIANCE')}\`\`\``,
  inline: true },
  { name: `<:hypesquad_balance:1186038262939258960> Balance`, 
   value: `\`\`\`${getCount('HOUSE_BALANCE')}\`\`\``,
  inline: true },
  { name: `<:discord_developer:1186038231175798845> Early Developer`, 
   value: `\`\`\`${getCount('EARLY_VERIFIED_BOT_DEBELOPER')}\`\`\``,
  inline: true },
  { name: `<:early:1186038188628783184> Early Supporter `, 
   value: `\`\`\`${getCount('EARLY_SUPPORTER')}\`\`\``,
        inline: true },
                        {
        name: `**__Locales__**: `,
        value: `** **`,
        inline: false
                        })*/
    const maxFields = 24;
langMsg.slice(0, maxFields).sort((a, b) => b.count - a.count).map(l => {
  embed.fields.push({
    name: `${l.flag} ${l.name}`,
    value: `\`\`\`${l.count}\`\`\``,
    inline: true
  });
});

const otherCountriesUsers = langMsg.slice(maxFields).reduce((total, l) => total + l.count, 0);
if (otherCountriesUsers > 0) {
  embed.fields.push({
    name: 'Diğer Ülkeler',
    value: `\`\`\`${otherCountriesUsers}\`\`\``,
    inline: true
  });
}
                        
                        /*langMsg.sort((a, b) => b.count - a.count).map(l => {
      embed.fields.push({
        name: `${l.flag} ${l.name}`,
        value: `\`\`\`${l.count}\`\`\``,
        inline: true
      })
    })*/


    message.channel.send({
      embeds: [
        embed
      ]
    })

  }
}