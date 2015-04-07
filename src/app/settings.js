'use strict';

var API_ROOT = 'https://www.reddit.com';

module.exports.ACCOUNT_STATE = {
    'UNKNOWN': 0,
    'LOGGEDIN': 1,
    'LOGGEDOUT': 2
};

module.exports.API = {
    LOGIN: API_ROOT + '/api/login',
    ME: API_ROOT + '/api/me.json'
};

module.exports.SUBREDDIT_ORDERS = {
    HOT: 'hot',
    TOP: 'top',
    NEW: 'new',
    RANDOM: 'random',
    CONTROVERSIAL: 'controversial'
};

module.exports.CONTENT_TYPES = {
    COMMENT: 't1',
    ACCOUNT: 't2',
    LINK: 't3',
    MESSAGE: 't4',
    SUBREDDIT: 't5',
    AWARD: 't6',
    PROMO_CAMPAIGN: 't8'
};