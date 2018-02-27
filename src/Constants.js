const BASE_URL = 'https://discordbots.org/api';
const ENDPOINTS = {
    bots: {
        search: '/bots',
        single: '/bots/:id',
        votes: '/bots/:id/votes',
        stats: '/bots/:id/stats'
    },
    users: '/users/:id'
};

module.exports = {BASE_URL, ENDPOINTS};