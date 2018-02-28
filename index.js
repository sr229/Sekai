const Tsuiga = require('./src/Tsuiga');
const Constants = require('./src/Constants');
const {Bot, User} = require('./src/Models');

Tsuiga.Constants = Constants;
Tsuiga.Bot = Bot;
Tsuiga.User = User;
module.exports = Tsuiga;