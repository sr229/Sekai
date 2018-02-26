# Tsuiga

Tsuiga is a **complete, drop-in replacement** to the official [dblapi.js Library](https://github.com/DiscordBotList/dblapi.js).

## Example usage

### POSTing stats

```js
// example query 
const Tsuiga = require('tsuiga');
const handler = new Tsuiga('TOKEN_HERE', 'BOT_ID_HERE');

handler.postStats(bot.guilds.size, bot.shards.size);
```

### GETing users

```js
// example query 
const Tsuiga = require('tsuiga');
const handler = new Tsuiga('TOKEN_HERE', 'BOT_ID_HERE');

handler.getUser('USER_ID');
```

## Documentation

Coming soon to a local Tonkku near you.