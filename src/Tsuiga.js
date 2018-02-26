/**
 * @file Tsuiga main class.
 * @copyright 2018 Ayana "Capuccino" Satomi
 * @license BSD-3-Clause
 */

const https = require('https');
const URL = require('url');
const Constants = require('./Constants');

function request(method, url, options, payload) {
    return new Promise((resolve, reject) => {
        let req = https.request(Object.assign(URL.parse(url), options, {method}), res => {
            let chunked = '';

            res.setEncoding('utf8');
            res.on('data', chunk => chunked += chunk);
            res.on('error', reject);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(chunked));
                } catch(e) {
                    resolve(chunked);
                }
            });
        });
        
        req.on('error', reject);
        req.write(payload);
        req.end();
    });
}

/**
 * Class for interfacing with the discordbots.org API.
 * 
 * @prop {String} key Key to use for authenticating with the API.
 */
class Tsuiga {
    /**
     * Creates a new Tsuiga instance.
     * 
     * @param {String} key discordbots.org authorisation key.
     * @param {String} [clientID] Client ID of the bot to send stats for.
     */
    constructor(key, clientID) {
        if (typeof key !== 'string') throw new TypeError('key is not a string.');
        if (clientID && typeof clientID !== 'string') throw new TypeError('clientID is not a string.');
        if (clientID && isNaN(clientID)) throw new TypeError('clientID is not only numerical characters.');

        this.key = key;
        this.clientID = clientID;
    }
    
    /**
     * Send bot stats to the API. Will only work if clientID was set in the constructor, or otherwise.
     * 
     * @param {Number} guildCount Amount of guilds the bot is on.
     * @param {Number} [shardCount=0] Amount of shards the bot is on.
     * @returns {Promise} .
     **/
    postStats(guildCount, shardCount=0) {
        return new Promise((resolve, reject) => {
            if (!this.clientID) return reject(new TypeError('clientID has not been specified.'));
            if (isNaN(guildCount)) return reject(new TypeError('guildCount is not a string.'));
            if (isNaN(shardCount)) return reject(new TypeError('shardCount is not a string.'));

            resolve(request('POST', Constants.BASE_URL + Constants.ENDPOINTS.bots.stats.replace(':id', this.clientID), {
                headers: {
                    Authorization: this.key,
                    'Content-Type': 'application/json'
                }
            }, JSON.stringify({
                server_count: guildCount,
                shard_count: shardCount
            })));
        });
    }
}

module.exports = Tsuiga;