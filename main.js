require('./server.js')
require('dotenv').config();
const oAuthClient = require('./src/Structures/oAuth');
const client = new oAuthClient();
client.start();
