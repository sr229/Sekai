const BASE_URL = 'https://discordbots.org/api';
const ENDPOINTS = {
    bots: {
        base: '/bots',
        bots: '/bots/:id',
        votes: '/bots/:id/votes',
        stats: '/bots/:id/stats'
    },
    users: '/users/:id'
};

module.exports = {BASE_URL, ENDPOINTS};