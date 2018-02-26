/**
* @file testPost.js
* @description a file to test Tsuiga#postStats
* @author Ayane "Capuccino" Satomi
* @copyright 2018 Ayane "Capuccino" Satomi
* @license BSD-3-Clause
*/

const Tsuiga = require('../');
const config = require('./test.json');
const handler = new Tsuiga(config.token || process.env.DBL_TOKEN, config.clientID || process.env.DISCORD_APP_SNOWFLAKE);

// send a test payload
try {
    handler.postStats(3,1);
} catch (e) {
    return new Error(`Error occured during POST test: ${e}`);
}
