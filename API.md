# API Documentation

## Tsuiga

#### Kind : Global Class

Class for interfacing with the [Discordbots.org](https://discordbots.org) API.

#### Parameters

| Property | Type | Description |
| ------- | ------- | ------ |
| key | String | Authorization key for discordbots.org |
| clientID | String<Snowflake> | Client ID of the Discord Application. Must be a valid Snowflake. |


## Methods

### Tsuiga#postStats()

Post stats to the API.

| Property | Type | Description |
| ------- | ------- | ------ |
| guildCount | Number | Amount of guilds the client is on. |
| shardCount | Number | Amount of shards the client has (default 0). |

Returns: `Promise`.

### Tsuiga#getUser()

Gets a specific user using the API.

| Property | Type | Description |
| ------- | ------- | ------ |
| id | String | The ID of the target user. |

Returns: `Promise<User>` The information of the user.

### Tsuiga#getBot()

Gets a listed bot in the API.

| Property | Type | Description |
| ------- | ------- | ------ |
| id | String | The ID of the target bot. |

Returns: `Promise<User>` The information of the bot.


### Tsuiga#getBotVotes()

Gets the votes for a particular bot.

| Property | Type | Description |
| ------- | ------- | ------ |
| id | String | The ID of the target bot. |
| options | Object | Options for the votes to be recieved by the API. |
| options.onlyIDs | Boolean | Whether to return an array of user IDs instead of user objects. |
|options.days | Number | Limits votes to ones were tallied within N days, valid range is whithin 0-30 days. |

Returns: `Promise<Object>` The votes for the bot.

### Tsuiga#getBotStats()

Gets the guild count and the shard stats for a particular bot.

| Property | Type | Description |
| ------- | ------- | ------ |
| id | String | The ID of the target bot. |

Returns: `Promise<Object>` The stats of the bot.

### Tsuiga#searchBots()

Searches for bots matching a specific criteria.

| Property | Type | Description |
| ------- | ------- | ------ |
| options | Object | Options to search with. |

Returns : `Promise<Bots[]>` List of the bots matching search criteria.





