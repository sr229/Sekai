/**
 * @file Tsuiga main class.
 * @copyright 2018 Ayana "Capuccino" Satomi
 * @license BSD-3-Clause
 */

const https = require('https');
const URL = require('url');
const querystring = require('querystring');
const Constants = require('./Constants');
const {Bot, User} = require('./Models');

function request(method, url, options, payload) {
    return new Promise((resolve, reject) => {
        let req = https.request(Object.assign(URL.parse(url), options, {method}), res => {
            let chunked = '';

            res.setEncoding('utf8');
            res.on('data', chunk => chunked += chunk);
            res.on('error', reject);
            res.on('end', () => {
                let val;

                try {
                    val = JSON.parse(chunked);
                } catch(e) {
                    return resolve(chunked);
                }

                if (val.error) return reject(new Error(val.error));
                else return resolve(val);
            });
        });

        req.on('error', reject);
        if (payload) req.write(payload);
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
     * @param {String} key Authorisation key for the bot.
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
            if (isNaN(guildCount)) return reject(new TypeError('guildCount is not a number.'));
            if (isNaN(shardCount)) return reject(new TypeError('shardCount is not a number.'));

            let url = Constants.BASE_URL + Constants.ENDPOINTS.bots.stats.replace(':id', this.clientID);

            resolve(request('POST', url, {
                headers: {
                    Authorization: this.key,
                    'Content-Type': 'application/json'
                }
            }, JSON.stringify({
                server_count: Number(guildCount),
                shard_count: Number(shardCount)
            })));
        });
    }

    /**
     * Gets information for a particular user.
     * 
     * @param {String} id ID of the target user to get info for.
     * @returns {Promise<User>} Information of the user.
     **/
    getUser(id) {
        return new Promise((resolve, reject) => {
            if (!id && typeof id !== 'string') return reject(new TypeError('id is not a string.'));
            
            let url = Constants.BASE_URL + Constants.ENDPOINTS.users.replace(':id', id);

            resolve(request('GET', url, {
                headers: {Authorization: this.key}
            }));
        }).then(res => new User(res));
    }

    /**
     * Get information for a particular bot.
     * 
     * @param {String} id ID of the bot to get info for.
     * @returns {Promise<Bot>} Information of the bot.
     */
    getBot(id) {
        return new Promise((resolve, reject) => {
            if (typeof id !== 'string') return reject(new TypeError('id is not a string.'));

            let url = Constants.BASE_URL + Constants.ENDPOINTS.bots.single.replace(':id', id);

            resolve(request('GET', url, {
                headers: {Authorization: this.key}
            }));
        }).then(res => new Bot(res));
    }

    /**
     * Gets the votes for a particular bot.
     * 
     * @param {String} id ID of the bot to get votes for.
     * @param {Options} [options={}] Options for the votes to be received.
     * @param {Boolean} [options.onlyIDs=false] Whether to return an array of user IDs instead of user objects.
     * @param {Number} [options.days] Limits votes to ones done within the last N days. Min 0, max 31.
     * @returns {Promise<Object>} Votes for the bot.
     */
    getBotVotes(id, options={}) {
        return new Promise((resolve, reject) => {
            if (typeof id !== 'string') return reject(new TypeError('id is not a string.'));
            if (options.hasOwnProperty('onlyIDs') && typeof options.onlyIDs !== 'boolean') return reject(new TypeError('options.onlyIDs is not a boolean.'));
            if (options.hasOwnProperty('days')) {
                if (isNaN(options.days)) return reject(new TypeError('options.days is not a number.'));
                if (!(0 <= options.days <= 31)) return reject(new Error(`options.days must not be less than 0 or greater than 31. Got ${options.days}`));
            }

            let url = Constants.BASE_URL + Constants.ENDPOINTS.bots.votes.replace(':id', id);
            let qs = {};

            if (options.hasOwnProperty('onlyIDs')) qs.onlyids = options.onlyIDs;
            if (options.hasOwnProperty('days')) qs.days = options.days;

            qs = '?' + querystring.stringify(qs);

            resolve(request('GET', url + qs, {
                headers: {Authorization: this.key}
            }));
        });
    }

    /**
     * Gets the server and shard stats for a particular bot.
     * 
     * @param {String} id ID of the bot to get stats for.
     * @returns {Promise<Object>} Stats for the bot.
     */
    getBotStats(id) {
        return new Promise((resolve, reject) => {
            if (typeof id !== 'string') return reject(new TypeError('id is not a string.'));

            let url = Constants.BASE_URL + Constants.ENDPOINTS.bots.stats.replace(':id', id);

            resolve(request('GET', url, {
                headers: {Authorization: this.key}
            }));
        });
    }

    /**
     * Searches DBL for bots matching various criteria.
     * 
     * @param {Object} [options] Options to search with.
     * @returns {Promise<Bots[]>} List of bots that matched the search criteria.
     */
    searchBots(options={}) {
        return new Promise((resolve, reject) => {
            if (options.hasOwnProperty('limit')) {
                if (isNaN(options.limit)) return reject(new TypeError('options.limit is not a number.'));
                if (0 < options.limit <= 500) return reject(new Error(`options.limit must not be less than 0 or larger than 500. Got: ${options.limit}`));
            }

            if (options.hasOwnProperty('offset')) {
                if (isNaN(options.offset)) return reject(new TypeError('options.offset is not a number.'));
                if (options.offset < 0) return reject(new Error(`options.offset must not be less than 0. Got: ${options.offset}`));
            }

            if (options.hasOwnProperty('sort') && typeof options.sort !== 'string') return reject(new TypeError('options.sort is not a string.'));
            if (options.hasOwnProperty('fields') && !Array.isArray(options.fields)) return reject(new TypeError('options.fields is not an array.'));

            let url = Constants.BASE_URL + Constants.ENDPOINTS.bots.base;
            let qs = {};

            if (options.hasOwnProperty('limit')) qs.limit = Number(options.limit);
            if (options.hasOwnProperty('offset')) qs.offset = Number(options.offset);
            if (options.hasOwnProperty('sort')) qs.sort = options.sort;
            if (options.hasOwnProperty('fields')) qs.fields = options.fields.join(',');
            if (options.hasOwnProperty('search')) qs.search = Object.entries(options.search).map(([k, v]) => `${k}: ${v}`).join(' ');

            qs = '?' + querystring.stringify(qs);

            resolve(request('GET', url + qs, {
                headers: {Authorization: this.key}
            }));
        }).then(res => {
            if (!res.results.filter(v => Object.keys(v).length).length) throw new Error('No results.');
            else return {
                total: res.total,
                bots: res.results.map(v => new Bot(v))
            };
        });
    }
}

module.exports = Tsuiga;