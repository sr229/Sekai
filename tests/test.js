/**
 * @file Various tests for Tsuiga.
 * @author Ayane "Capuccino" Satomi
 * @author Ovyerus
 * @license BSD-3-Clause
 */

const Tsuiga = require('../');
const fs = require('fs');
const assert = require('assert');
let config;

if (fs.existsSync(`${__dirname}/config.json`)) config = require(`${__dirname}/config.json`);
else config = {};

const handler = new Tsuiga(config.token || process.env.DBL_TOKEN, config.clientID || process.env.DISCORD_APP_SNOWFLAKE);

console.log('Starting tests for Tsuiga');
console.log('Make sure that these look alright.\n\n');

(async () => {
    console.log('Testing `Tsuiga#getUser`');
    let user = await handler.getUser('99742488666845184');
    assert(user instanceof Tsuiga.User);
    console.log(user);
    console.log('\n\n');

    console.log('Testing `Tsuiga#getBot`');
    let bot = await handler.getBot('245520198109495296');
    assert(bot instanceof Tsuiga.Bot);
    console.log(bot);
    console.log('\n\n');
    
    console.log('Testing Tsuiga#postStats');
    let o = await handler.postStats(26, 1);
    assert(o instanceof Object);
    console.log(o);
    console.log('\n\n');
    
})().then(() => {
    console.log('All tests completed.');
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});