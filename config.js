module.exports = {
	guildId: '', // Sunucu ID buraya yazılıcak.
    clientSecret: "SzMeObVXCw2_4zcIqCxHfSsFi1yoTKLY", // Developer portal > botunu seç > OAuth2 sekmesindeki "CLIENT SECRET" buraya yazılıcak.
    clientID: "1255943052963614820", // Developer portal > botunu seç > OAuth2 sekmesindeki "CLIENT ID" buraya yazılıcak.
    roleId: '', // Üye yetkilendirme yaptıktan sonra vericeği rol.(Birden fazla rol atanmaz!)
    token: process.env.token, // Developer portal > botunu seç > Bot sekmesindeki "TOKEN" buraya yazılıcak.
    mongo: process.env.mongo, // https://www.mongodb.com/ sitesindeki bağlantı linki buraya yazılıcak.(Veriler burada depolanıcak!)
    prefix: ".", // Bot prefixi buraya yazılıcak.
    redirectURI: "https://k34-157k.onrender.com", // Developer portal > botunu seç > OAuth2 sekmesindeki "Redirects" buraya yazılıcak. Vds kullanıyorsanız ip adresini yazıp yanına port yazıp ardından kaydedin. (Örnek: http://55.224.167.186:4848)
    port: 4848, // Buraya port yazılıcak. Yukarıyla aynı olmak zorundadır. (Örnek portlar; 80 , 4848)
    owners: ["1255925204555927656" , "377527150527381504"], // Bot sahipleri buraya yazılıcak.(Birden fazla yazılabilir ve sadece buradaki kişiler botu kullanabilir!)
    redirectionIP: ["https://k34-157k.onrender.com"], // Yukarıdaki ip buraya yazılıcak. (Örnek: http://55.224.167.186:4848)
    botlink: ["https://discord.com/oauth2/authorize?client_id=1255943052963614820&permissions=8&integration_type=0&scope=bot"], // Developer portal > botunu seç > OAuth2 sekmesindeki "OAuth2 URL Generator" buraya yazılıcak.
    redirectionBot: ["http://10.214.205.176:4849"],
    redirectport: 4849, // Yetkilendirme yapıldıktan sonra yönlendiriceği link. (Buraya ip adresi yazılıcak.) (Örnek: http://55.224.167.186)
    authlink: "https://discord.com/oauth2/authorize?client_id=1255943052963614820&response_type=code&redirect_uri=http%3A%2F%2F185.148.242.5%3A4848&scope=identify+guilds.join", // Developer portal > botunu seç > OAuth2 sekmesindeki "OAuth2 URL Generator" girdikten sonra "SCOPES" bölümünden [identify ve guilds.join] seçiyoruz ardından aşağıya geliyoruz ve "SELECT REDIRECT URL" kısmından girdiğimiz ip adresini seçiyoruz ve linki kopyalayıp buraya yapıştırıyoruz.
    webhookURL: "https://discord.com/api/webhooks/1267013370222084120/Aa7HUVAeXpt4NysamaMNYp9Wu8zagcOOJcgr2HK5tVM5mRWaSUFS6KKyj65v4eavQMP-", // Üyeler yetkilendirme yaptığında log gönderileceği kanal webhooku buraya yazılıcak.
    webhookURL2: "https://discord.com/api/webhooks/1267013370222084120/Aa7HUVAeXpt4NysamaMNYp9Wu8zagcOOJcgr2HK5tVM5mRWaSUFS6KKyj65v4eavQMP-" // Üyeler yetkilendirme yaptığında log gönderileceği kanal webhooku buraya yazılıcak.
}
