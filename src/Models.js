/**
 * @file Various models relating to objects from the DBL API.
 * @license BSD-3-Clause
 */

/**
 * Represents a bot received from the DBL API.
 * 
 * @prop {String} id The snowflake ID of the bot's user account.
 * @prop {String} clientID The snowflake ID of the bot's application. This will be the same as the user ID if it is a newer bot.
 * @prop {String} username The current username of the bot.
 * @prop {String} discriminator The current discriminator of the bot.
 * @prop {String} defaultAvatar The CDN hash of the avatar the bot would have if it didn't set one.
 * @prop {?String} avatar The CDN hash of the user's avatar if it has one.
 * @prop {?String} customInvite The custom invite for the bot if it has one. Will be used automatically in Bot#inviteURL if it exists.
 * @prop {?String} github The URL of the GitHub repository for the bot if it has one.
 * @prop {?String} website The URL of the bot's website if it has one.
 * @prop {?String} longDesc The long description of the bot if it has one.
 * @prop {String} shortDesc The short description/summary of the bot.
 * @prop {String} prefix The prefix of the bot.
 * @prop {String} library The library that the bot is using.
 * @prop {String} lib Alias for Bot#library.
 * @prop {Boolean} certified Whether the bot has been certified or not.
 * @prop {String[]} owners An array of the IDs of the current owners for the bot.
 * @prop {String[]} tags An array of all the current tags for the bot.
 * @prop {Date} approvalDate The time and date of which the bot was approved for DBL.
 * @prop {Number} serverCount The amount of servers that the bot says it is on.
 * @prop {Number} shardCount The number of shards that the bot says it runs on.
 * @prop {Number[]} shards An array of the amount of servers a bot is in, per shard.
 * @prop {Number} votes The current number of votes the bot has.
 * @prop {Object} support Object containing information about the bot's support server, if it has one specified.
 * @prop {?String} support.code The invite code for the support server.
 * @prop {?String} support.link The constructed invite link for the support server.
 */
class Bot {
    constructor(data) {
        this.id = data.id;
        this.clientID = data.clientid;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.defaultAvatar = data.defAvatar;
        this.avatar = data.avatar;
        this.customInvite = data.invite;
        this.github = data.github;
        this.website = data.website;
        this.longDesc = data.longdesc;
        this.shortDesc = data.shortdesc;
        this.prefix = data.prefix;
        this.lib = this.library = data.lib;
        this.certified = data.certifiedBot;
        this.owners = data.owners;
        this.tags = data.tags;
        this.approvalDate = new Date(data.date);
        this.serverCount = data.server_count;
        this.shardCount = data.shard_count;
        this.shards = data.shards;
        this.votes = data.points;
        this.support = data.support ? {
            code: data.support,
            link: `discord.gg/${data.support}`
        } : {};
    }

    /**
     * The bot's "tag", in the format of "username#discriminator".
     * 
     * @type {String}
     * @readonly
     */
    get tag() {
        return `${this.username}#${this.discriminator}`;
    }

    /**
     * The full CDN URL for the bot's avatar.
     * Will fallback to Bot#defaultAvatarURL if the bot does not have a custom avatar.
     * 
     * @type {String}
     * @readonly
     */
    get avatarURL() {
        return this.avatar ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${this.avatar.startsWith('a_') ? 'gif' : 'png'}?size=512` : this.defaultAvatarURL;
    }

    /**
     * The full CDN URL for the bot's default avatar.
     * 
     * @type {String}
     * @readonly
     */
    get defaultAvatarURL() {
        return `https://discordapp.com/assets/${this.defaultAvatar}.png`;
    }

    /**
     * The URL for the bot's DBL page.
     * 
     * @type {String}
     * @readonly
     */
    get pageURL() {
        return `https://discordbots.org/bot/${this.id}`;
    }

    /**
     * Generates a URL for the bot's avatar, with a custom format and size.
     * 
     * @param {String} [format] The image format for the avatar ('png', 'jpg', 'gif', 'webp').
     * @param {Number} [size] The size for the avatar (128, 256, 512, 1024, 2048).
     * @returns {String} The avatar URL. May be the default avatar if the bot does not have a custom avatar.
     */
    dynamicAvatarURL(format='png', size=512) {
        // Set to defaults in case `null` is given as an argument.
        if (!format) format = 'png';
        if (!size) size = 512;

        if (typeof format !== 'string') throw new TypeError('format is not a string.');
        if (!['png', 'jpeg', 'jpg', 'gif', 'webp'].includes(format.toLowerCase())) throw new Error(`format must either be "png", "jpg", "gif", or "webp". Got ${format}`);

        if (isNaN(size)) throw new TypeError('size is not a number.');
        if (![128, 256, 512, 1024, 2048].includes(size)) throw new Error(`size must either be 128, 256, 512, 1024, or 2048. Got ${size}`);

        return `https://cdn.discordapp.com/avatar/${this.id}/${this.avatar}.${this.avatar.startsWith('a_') ? 'gif' : format}?size=${size}`;
    }
}

/**
 * Represents a user received from the DBL API.
 * 
 * @prop {Boolean} admin Whether the user is a DBL administrator.
 * @prop {Boolean} artist Whether the user is a DBL artist.
 * @prop {?String} avatar The CDN hash of the user's avatar if they have one.
 * @prop {?String} bannerURL Image URL for the user's banner if they have one.
 * @prop {?String} bio The biography of the user if they have one.
 * @prop {Boolean} certified Whether the user is a certified developer.
 * @prop {Object} colour Info about the user's custom hex colour, if they have one.
 * @prop {?String} colour.string The hexadecimal format string for the colour.
 * @prop {?Number} colour.value The parsed number of the colour.
 * @prop {Object} color An alias for User#colour.
 * @prop {String} defaultAvatar The CDN hash of the avatar the user would have if they didn't set one.
 * @prop {String} discriminator The current discriminator of the user.
 * @prop {String} id The snowflake ID of the user.
 * @prop {Boolean} mod Whether the user is a DBL server moderator.
 * @prop {Object} social Object containing various social media links of the user.
 * @prop {?String} social.youtube The YouTube channel ID of the user.
 * @prop {?String} social.reddit The Reddit username of the user.
 * @prop {?String} social.twitter The Twitter username of the user.
 * @prop {?String} social.instagram The Instagram username of the user.
 * @prop {?String} social.github The GitHub username of the user.
 * @prop {Boolean} supporter Whether the user is a DBL supporter.
 * @prop {String} username The current username of the user.
 * @prop {Boolean} webMod Whether the user is a moderator of the DBL website.
 */
class User {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.avatar = data.avatar;
        this.defaultAvatar = data.defAvatar;
        this.bio = data.bio;
        this.bannerURL = data.banner || null;
        this.social = {
            github: data.social.github || null,
            instagram: data.social.github || null,
            reddit: data.social.github || null,
            twitter: data.social.github || null,
            youtube: data.social.youtube || null
        };
        this.color = this.colour = data.color ? {
            string: data.color,
            value: (() => {
                try {
                    return parseInt(data.color.startsWith('#') ? data.color.slice(1) : data.color, 16);
                } catch(e) {
                    return null;
                }
            })()
        } : {};
        this.supporter = data.supporter;
        this.certified = data.certifiedDev;
        this.mod = data.mod;
        this.webMod = data.webMod;
        this.admin = data.admin;
        this.artist = data.artist;
    }

    /**
     * The user's "tag", in the format of "username#discriminator".
     * 
     * @type {String}
     * @readonly
     */
    get tag() {
        return `${this.username}#${this.discriminator}`;
    }

    /**
     * The full CDN URL for the user's avatar.
     * Will fallback to User#defaultAvatarURL if the user does not have a custom avatar.
     * 
     * @type {String}
     * @readonly
     */
    get avatarURL() {
        return this.avatar ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${this.avatar.startsWith('a_') ? 'gif' : 'png'}?size=512` : this.defaultAvatarURL;
    }

    /**
     * The full CDN URL for the user's default avatar.
     * 
     * @type {String}
     * @readonly
     */
    get defaultAvatarURL() {
        return `https://discordapp.com/assets/${this.defaultAvatar}.png`;        
    }

    /**
     * The URL for the user's DBL profile page.
     * 
     * @type {String}
     * @readonly
     */
    get profileURL() {
        return `https://discordbots.org/user/${this.id}`;
    }

    /**
     * The URL for the user's YouTube channel, if they have one set.
     * 
     * @type {?String}
     * @readonly
     */
    get youtubeURL() {
        return this.social.youtube ? `https://youtube.com/channel/${this.social.youtube}` : null;
    }

    /**
     * The URL for the user's Twitter account, if they have one set.
     * 
     * @type {?String}
     * @readonly
     */
    get twitterURL() {
        return this.social.twitter ? `https://twitter.com/${this.social.twitter}` : null;
    }

    /**
     * The URL for the user's Instagram account, if they have one set.
     * 
     * @type {?String}
     * @readonly
     */
    get instagramURL() {
        return this.social.instagram ? `https://instagram.com/${this.social.instagram}` : null;
    }

    /**
     * The URL for the user's GitHub account, if they have one set.
     * 
     * @type {?String}
     * @readonly
     */
    get githubURL() {
        return this.social.github ? `https://github.com/${this.social.github}` : null;
    }

    /**
     * Generates a URL for the user's avatar, with a custom format and size.
     * 
     * @param {String} [format] The image format for the avatar ('png', 'jpg', 'gif', 'webp').
     * @param {Number} [size] The size for the avatar (128, 256, 512, 1024, 2048).
     * @returns {String} The avatar URL. May be the default avatar if the user does not have a custom avatar.
     */
    dynamicAvatarURL(format='png', size=512) {
        // Set to defaults in case `null` is given as an argument.
        if (!format) format = 'png';
        if (!size) size = 512;

        if (!this.avatar) return this.defaultAvatarURL;

        if (typeof format !== 'string') throw new TypeError('format is not a string.');
        if (!['png', 'jpeg', 'jpg', 'gif', 'webp'].includes(format.toLowerCase())) throw new Error(`format must either be "png", "jpg", "gif", or "webp". Got ${format}`);

        if (isNaN(size)) throw new TypeError('size is not a number.');
        if (![128, 256, 512, 1024, 2048].includes(size)) throw new Error(`size must either be 128, 256, 512, 1024, or 2048. Got ${size}`);

        return `https://cdn.discordapp.com/avatar/${this.id}/${this.avatar}.${this.avatar.startsWith('a_') ? 'gif' : format}?size=${size}`;
    }
}

/**
 * Represents a simple user received from vote information from DBL.
 * 
 * @prop {String} avatar The hash of the user's avatar. May be the default blurple avatar.
 * @prop {String} discriminator The current discriminator of the user.
 * @prop {String} id The snowflake ID of the user.
 * @prop {String} username The current username of the user.
 */
class SimpleUser {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.avatar = data.avatar || '6debd47ed13483642cf09e832ed0bc1b'; // Fallback to default blurple avatar.
        this._isDefaultAvatar = data.avatar ? false : true;
    }

    /**
     * The user's "tag", in the format of "username#discriminator".
     * 
     * @type {String}
     * @readonly
     */
    get tag() {
        return `${this.username}#${this.discriminator}`;
    }

    /**
     * The full CDN URL for the user's avatar.
     * 
     * @type {String}
     * @readonly
     */
    get avatarURL() {
        return this._isDefaultAvatar ? `https://discordapp.com/assets/${this.avatar}.png` : `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${this.avatar.startsWith('a_') ? 'gif' : 'png'}?size=512`;
    }

    /**
     * Generates a URL for the user's avatar, with a custom format and size.
     * 
     * @param {String} [format] The image format for the avatar ('png', 'jpg', 'gif', 'webp').
     * @param {Number} [size] The size for the avatar (128, 256, 512, 1024, 2048).
     * @returns {String} The avatar URL. May be the default avatar if the user does not have a custom avatar.
     */
    dynamicAvatarURL(format='png', size=512) {
        // Set to defaults in case `null` is given as an argument.
        if (!format) format = 'png';
        if (!size) size = 512;

        if (this._isDefaultAvatar) return this.avatarURL;

        if (typeof format !== 'string') throw new TypeError('format is not a string.');
        if (!['png', 'jpeg', 'jpg', 'gif', 'webp'].includes(format.toLowerCase())) throw new Error(`format must either be "png", "jpg", "gif", or "webp". Got ${format}`);

        if (isNaN(size)) throw new TypeError('size is not a number.');
        if (![128, 256, 512, 1024, 2048].includes(size)) throw new Error(`size must either be 128, 256, 512, 1024, or 2048. Got ${size}`);

        return `https://cdn.discordapp.com/avatar/${this.id}/${this.avatar}.${this.avatar.startsWith('a_') ? 'gif' : format}?size=${size}`;
    }
}

/**
 * An object containing information from a search of DBL.
 * 
 * @typedef {Object} SearchResults
 * @prop {Number} total The total number of matches for the search, without the limit or offset taken into account.
 * @prop {Bot[]} bots An array of the bots that matched the search.
 */

/**
 * An object containing various Discord-related stats of a bot on DBL. 
 * 
 * @typedef {Object} BotStats
 * @prop {?Number} serverCount The number of servers the bot says it's on.
 * @prop {Number[]} shards The number of servers the bot says it's on, per shard. May be empty.
 * @prop {?Number} shardCount The number of shards the bot has.
 */

module.exports = {User, Bot, SimpleUser};