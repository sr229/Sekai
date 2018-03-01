# Tsuiga

Tsuiga is a complete alternative library for the official [dblapi.js Library](https://github.com/DiscordBotList/dblapi.js).

Differences to the official library:
 - No dependencies at all.
 - Custom classes so you can type check results, and which contain some extra helpers.
 - Type checking.
 - camelCase for data returned from the API, instead of snake_case.

## Example usage

### Sending stats

```js
// example query 
const Tsuiga = require('tsuiga');
const handler = new Tsuiga('TOKEN_HERE', 'BOT_ID_HERE');

handler.postStats(bot.guilds.size, bot.shards.size).then(() => console.log('Sent stats!'));
```

### Getting a user

```js
// example query 
const Tsuiga = require('tsuiga');
const handler = new Tsuiga('TOKEN_HERE', 'BOT_ID_HERE');

handler.getUser('USER_ID').then(console.log);
```

## Documentation

Documentation for the API can be found [here](API.md) 