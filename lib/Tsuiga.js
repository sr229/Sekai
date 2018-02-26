/**
 * @file Tsuiga.js
 * @description Tsuiga Main Class
 * @copyright 2018 Ayana "Capuccino" Satomi
 * @license BSD 3-Clause
 */
 const https = require('https');
 const url = require('url');
 const Constants = require('./Contstants');
 
 /**
  * Instantiates a Tsuiga instance.
  * @class
  */
class Tsuiga {
    /**
     * @param {String} key Your key for Discord Bots List.
     **/
    constructor(key) {
        this.key = key;
        if (typeof key !== 'string') return new TypeError('key is not a string');
    }
    
    /**
     * posts bot stats to API
     * @param {String} guildCount your client's guild count
     * @param {String} shardCount your client's shard count.
     **/
     postStats(guildCount, shardCount) {
         
         if (isNaN(guildCount)) return new TypeError('guildCount is not a string');
         if (isNaN(shardCount)) return new TypeError('shardCount is not a string');
         
         return new Promise((resolve, reject) => {
             https.request(Object.assign(url.parse(Constants.BASE_URL + Constants.BOTS_BASE_ENDPOINT + Constants.BOTS_STATS_ENDPOINT), {
                 headers: {Authorization: this.key},
                 body: JSON.stringify({
                     server_count: guildCount,
                     shard_count: shardCount
                 })
             }), res => {
                 if (res.status !== 200) reject(res);
                 else resolve(res);
             });
         });
     }
}
module.exports = Tsuiga;