const { Client, Collection, Options } = require("discord.js")
    , glob = require("glob")
    , pGlob = require('util').promisify(glob)
    , mongoose = require('mongoose')

const { success, logErr } = require('./Functions');

class oAuth extends Client {

    constructor() {

        super({
            intents: 33283,
            allowedMentions: { repliedUser: false },
            partials: ["CHANNEL"],
            makeCache: Options.cacheWithLimits({
                PresenceManager: 0,
                UserManager: 0,
                GuildEmojiManager: 0,
            }),
        });

        // Config nesnesini boş başlatıp gerekli değerleri atıyoruz.
        // Diğer config değerlerini (guildId, clientID vb.) hala config.js'den çekmek istiyorsanız
        // burada this.config = require('../../config'); satırını da tutabilirsiniz.
        // Ancak token ve mongo'yu doğrudan ortam değişkeninden çekiyoruz.
        this.config = {};
        this.config.mongo = process.env.mongo; // Mongo bağlantısını direkt env'den al.

        ['commands', 'allUsers', 'joins', 'refresh'].forEach(x => this[x] = new Collection());
        this.color = require('./Colors');
        this.emoji = require('./Emojis');
    }


    async loadDatabase() {
        try {
            // MongoDB bağlantısını direkt olarak process.env.mongo'dan çekiyoruz
            await mongoose.connect(this.config.mongo, {
                autoIndex: true,
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4
            });

            success("Database loaded");

        } catch (err) {
            logErr(`Database error : ${err}`);
            // Veritabanı bağlantısı hatasında process'i durdur
            console.error("Veritabanına bağlanılamadı. Bot başlatılamıyor.");
            process.exit(1); // Hatalı çıkış kodu
        }
    }


    async loadEvents() {
        (await pGlob(`${process.cwd()}/src/Events/*/*.js`)).map(async eventFile => {
            const event = require(eventFile);

            if (!event.name) throw new Error('Nom event manquant');

            if (event.once) {
                this.once(event.name, (...args) => event.execute(this, ...args));
            } else {
                this.on(event.name, (...args) => event.execute(this, ...args));
            }
        });
    }

    async loadCommands() {
        (await pGlob(`${process.cwd()}/src/Commands/*/*.js`)).map(async cmdFile => {
            const command = require(cmdFile);
            delete require.cache[command];
            if (!command.name) throw new Error('Nom z');
            this.commands.set(command.name, command);
        });
    }

    // Login metodunu senkron hale getirdik, böylece hataları yakalayabiliriz.
    async loginBot() {
        const botToken = process.env.token;

        if (!botToken) {
            throw new Error("TOKEN_BULUNAMADI: Ortam değişkenlerinde bot token'ı bulunamadı. Lütfen 'token' adlı bir ENV değişkeni tanımlayın.");
        }

        try {
            await super.login(botToken);
            success("Discord'a başarıyla giriş yapıldı!");
        } catch (err) {
            if (err.code === 'TOKEN_INVALID') {
                throw new Error("TOKEN_HATASI: Geçersiz bot token'ı. Lütfen Discord Developer Portal'dan token'ınızı kontrol edin.");
            } else {
                throw new Error(`DİSCORD_BAĞLANTI_HATASI: Discord'a bağlanırken bir hata oluştu: ${err.message}`);
            }
        }
    }

    async start() {
        try {
            // Önce Discord'a giriş yapmayı dene
            await this.loginBot();
            // Eğer Discord'a giriş başarılı olursa, diğer yüklemelere geç
            await this.loadDatabase();
            this.loadCommands();
            this.loadEvents();
            // Not: Botun Discord'a tamamen bağlı olduğunu ready eventi ile anlayacaksınız.
            // Burada ek bir login çağrısı yapmanıza gerek yok, loginBot() hallediyor.
        } catch (error) {
            logErr(`BAŞLANGIÇ_HATASI: ${error.message}`);
            console.error("Bot başlatılırken kritik bir hata oluştu. Lütfen logları kontrol edin.");
            process.exit(1); // Hata durumunda uygulamayı kapat
        }
    }

}

// BAYTONBOT
process.on('exit', (code) => { console.log(`Processus arrêté avec le code ${code}`) });
process.on('uncaughtException', (err, origin) => { console.log(err, origin); });
process.on('unhandledRejection', (reason, promise) => { console.log(reason, promise); });
process.on('warning', (...args) => { console.log(...args) });

module.exports = oAuth;
