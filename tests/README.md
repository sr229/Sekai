# Tests

Before running any tests here, you'll have to do one of two things.

1. Create a `config.json` in this directory with the following properties:
```json
{
    "token": "",
    "clientID": ""
}
```

2. or create these environment variables:
```
TSUIGA_DBL_TOKEN
TSUIGA_CLIENT_ID
```

Afterwards, run `node test.js`.