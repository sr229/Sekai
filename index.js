const Tsuiga = require('./src/Tsuiga');
const Constants = require('./src/Constants');
const {Bot, User, SimpleUser} = require('./src/Models');

Tsuiga.Constants = Constants;
Tsuiga.Bot = Bot;
Tsuiga.User = User;
Tsuiga.SimpleUser = SimpleUser;
module.exports = Tsuiga;