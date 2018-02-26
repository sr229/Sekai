/**
 * @file Sekai.js
 * @description Sekai Main Class
 * @copyright 2018 Ayana "Capuccino" Satomi
 * @license BSD 3-Clause
 */
 const https = require('https');
 const url = require('url');
 const Constants = require('./Contstants');
 
 /**
  * Instantiates a Sekai instance.
  * @class
  */
class Sekai {
    /**
     * @param {String} key Your key for Discord Bots List.
     * @see {Link} 
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
         
         if (typeof guildCount !== 'string') return new TypeError('guildCount is not a string');
         if (typeof shardCount !== 'string') return new TypeError('shardCount is not a string');
         
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
module.exports = Sekai;