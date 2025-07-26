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

        // Config dosyasını artık doğrudan burada yüklemiyoruz,
        // ancak diğer config değerlerine ihtiyaç duyuyorsanız bu satırı korumanız gerekebilir
        // ve ilgili değerleri de ortam değişkenlerinden çekmelisiniz.
        // Şimdilik sadece token ve mongo için direkt çekim yapıldı.
        this.config = {}; // config nesnesini boş başlatıp gerekli değerleri atayabiliriz.
        this.config.mongo = process.env.mongo; // Mongo bağlantısını da direkt env'den al.

        ['commands', 'allUsers', 'joins', 'refresh'].forEach(x => this[x] = new Collection());
        this.color = require('./Colors');
        this.emoji = require('./Emojis');
    }


    async loadDatabase() {
        try {
            // MongoDB bağlantısını direkt olarak process.env.mongo'dan çekiyoruz
            mongoose.connect(this.config.mongo, {
                autoIndex: true,
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4
            })

            success("Database loaded")

        } catch (err) {
            logErr(`Database error : ${err}`)
        }

    }


    async loadEvents() {

        (await pGlob(`${process.cwd()}/src/Events/*/*.js`)).map(async eventFile => {
            const event = require(eventFile);

            if (!event.name) throw new Error('Nom event manquant')

            if (event.once) {
                this.once(event.name, (...args) => event.execute(this, ...args));
            } else {
                this.on(event.name, (...args) => event.execute(this, ...args));
            }

        })

    }

    async loadCommands() {

        (await pGlob(`${process.cwd()}/src/Commands/*/*.js`)).map(async cmdFile => {
            const command = require(cmdFile);
            delete require.cache[command];
            if (!command.name) throw new Error('Nom z')
            this.commands.set(command.name, command)
        })

    }

    login() {
        // Token'ı direkt process.env.token'dan alıyoruz
        const botToken = process.env.token; 

        if (!botToken)
            throw new Error("Aucun token spécifié..."); // "Token belirtilmedi" hatası fırlatır

        // BAYTONBOT
        super.login(botToken); // Discord'a giriş yapmak için tokeni kullanır
    }

    async start() {
        await this.loadDatabase();
        this.loadCommands();
        this.loadEvents();
        this.login();
    }

}

// BAYTONBOT
process.on('exit', (code) => { console.log(`Processus arrêté avec le code ${code}`) });
process.on('uncaughtException', (err, origin) => { console.log(err, origin); });
process.on('unhandledRejection', (reason, promise) => { console.log(reason, promise); });
process.on('warning', (...args) => { console.log(...args) });

module.exports = oAuth;
