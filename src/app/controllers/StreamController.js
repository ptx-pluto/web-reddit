'use strict';

var Feed = require('../models/Feed.js'),
    settings = require('../settings.js'),
    ORDERS = settings.SUBREDDIT_ORDERS;

module.exports = Ember.ArrayController.extend({

    needs: ['subreddit'],

    itemController: 'feed',

    name: Ember.computed.alias('controllers.subreddit.name'),

    order: Ember.computed.alias('controllers.subreddit.order'),

    after: null,

    requestID: null,

    isLoading: function(){
        return this.get('requestID') !== null;
    }.property('requestID'),

    url: function(){
        return  'https://reddit.com/r/' + this.get('name') + '/' + this.get('order') + '.json';
    }.property('name', 'order'),

    onSwitchStream: function(){
        if (this.get('name') && this.get('order')) {
            this.get('model').clear();
            this.setProperties({
                requestID: null,
                after: null,
                order: ORDERS.HOT
            });
            this.loadMore();
        }
    }.observes('name', 'order'),

    loadMore: function(){

        if (this.get('isLoading')) {
            return;
        }

        var _self = this,
            feeds = this.get('model'),
            timestamp = (new Date()).getTime();

        this.set('requestID', timestamp);

        var params = {
            jsonp: 'jsonp',
            dataType: 'jsonp',
            type: 'GET'
        };

        if (this.get('after') !== null) {
            params.data = {
                after: this.get('after')
            };
        }

        jQuery
            .ajax(_self.get('url'), params)
            .then(function(data){
                if (_self.get('requestID') === timestamp) {
                    var listing = data.data.children;
                    feeds.pushObjects(listing.map(function(article){
                        return Feed.create(article.data);
                    }));
                    _self.set('requestID', null);
                }
            });

    },

    actions: {

        load: function(){
            this.loadMore();
        }

    }

});