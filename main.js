require('./server.js')
const oAuthClient = require('./src/Structures/oAuth');
const client = new oAuthClient();
client.start();
