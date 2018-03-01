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
else config = {
    token: process.env.TSUIGA.TSUIGA_DBL_TOKEN,
    clientID: process.env.TSUIGA_CLIENT_ID
};

const handler = new Tsuiga(config.token, config.clientID);

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

    console.log('Testing `Tsuiga#getBotVotes` with `options.onlyIDs=true` and `options.days=10`');
    let votes = await handler.getBotVotes('245520198109495296', {onlyIDs: true, days: 10});
    console.log(votes);
    console.log('\n\n');

    console.log('Testing `Tsuiga#getBotStats`');
    let stats = await handler.getBotStats('245520198109495296');
    console.log(stats);
    console.log('\n\n');

    console.log('Testing `Tsuiga#searchBots` with `options.limit=5` and `options.offset=10`');
    let bots = await handler.searchBots({limit: 5, offset: 10});
    console.log(bots);
    console.log('\n\n');

    console.log('Testing `Tsuiga#postStats` with `guildCount = 26` and `shardCount = 1`');
    let o = await handler.postStats(26, 1);
    console.log(o);
    console.log('\n\n');
})().then(() => {
    console.log('All tests completed.');
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});