const BASE_URL = 'https://discordbots.org/api';
const ENDPOINTS = {
    bots: {
        base: '/bots',
        bot: '/bots/:id',
        votes: '/bots/:id/votes',
        stats: '/bots/:id/stats'
    },
    user: '/users/id'
};

module.exports = {BASE_URL, ENDPOINTS};