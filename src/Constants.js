const BASE_URL = 'https://discordbots.org/api';
const ENDPOINTS = {
    bots: {
        base: '/bots',
        users: '/users/:id',
        votes: '/bots/:id/votes',
        stats: '/bots/:id/stats'
    },
    users: '/users/:id'
};

module.exports = {BASE_URL, ENDPOINTS};