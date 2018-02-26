/**
* @file testGetUser.js
* @description a file to test Tsuiga#getUser
* @author Ayane "Capuccino" Satomi
* @copyright 2018 Ayane "Capuccino" Satomi
* @license BSD-3-Clause
*/

const Tsuiga = require('../');
const config = require('./test.json');
const handler = new Tsuiga(config.token || process.env.DBL_TOKEN, config.clientID || process.env.DISCORD_APP_SNOWFLAKE);

// send a test payload

try {
    handler.getUser('184632227894657025').then(res => console.log(res));
} catch(e) {
    return new Error(`An Error occured during GET: ${e}`);
}