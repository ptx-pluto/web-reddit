'use strict';

var _ = require('underscore');

var utils = require('../utils.js'),
    Profile = require('../models/Profile.js');

module.exports = Ember.ObjectController.extend({

    isFetchingProfile: false,

    isFetchingToken: false,

    token: null,

    uuid: null,

    loginURL: null,

    popup: null,

    resume: function(){

        var clientID = 'WeVdB8YkKe-TJw',
            scopes = [
                'identity',
                'save',
                'read',
                'subscribe',
                'mysubreddits',
                'history'
            ].join(','),
            callbackURL = 'http://reddit.localhost/api/oauth/callback',
            uuid = utils.getRandomString(30),
            url = 'https://ssl.reddit.com/api/v1/authorize?' +
                'client_id='+clientID+'&'+
                'response_type=code&'+
                'state='+uuid+'&'+
                'redirect_uri='+callbackURL+'&'+
                'duration=permanent&'+
                'scope='+scopes;

        this.setProperties({
            uuid: uuid,
            loginURL: url
        });

        var token = localStorage.getItem('token');
        if (token) {
            this.set('token', token);
        }

    }.on('init'),


    storeToken: function(){
        var token = this.get('token');
        if (token) {
            localStorage.setItem('token', token);
        }
        else {
            localStorage.removeItem('token');
        }
    }.observes('token'),


    resumeProfile: function(){

        var _self = this,
            token = this.get('token');
        if (!token) return;

        token = 'bearer ' + token;

        _self.set('isFetchingProfile', true);

        jQuery.ajax('/reddit/api/v1/me', { headers: { Authorization: token } })
            .then(
            function(data){
                _self.setProperties({
                    isFetchingProfile: false,
                    model: Profile.create(data)
                });
            },
            function(){
                _self.set('isFetchingProfile', false);
                _self.send('logout');
                Ember.Logger.log('token invalid, logout and login again');
            }
        )

    }.observes('token'),


    actions: {

        closePopup: function(){
            var popup = this.get('popup');
            if (popup) {
                popup.close();
                this.set('popup', null);
            }
        },

        loginPopup: function(){

            if (this.get('popup')) return;

            var _self = this,
                handle = window.open(this.get('loginURL'), '_blank');

            if (!handle) return;

            this.set('popup', handle);

            var timer = setInterval(function(){
                if (handle.closed) {
                    clearInterval(timer);
                    _self.set('popup', null);
                    _self.send('login');
                }
            }, 500);

        },

        login: function(){

            var _self = this,
                MAX_TRIALS = 20,
                counter = 0;

            _self.set('isFetchingToken', true);

            attempt();

            function attempt(){
                jQuery.ajax('/api/oauth/token', { data: { uuid: _self.get('uuid') } })
                    .then(
                    function(data){
                        _self.setProperties({
                            isFetchingToken: false,
                            token: data['access_token']
                        });
                    },
                    function(){
                        counter++;
                        if (counter < MAX_TRIALS) {
                            setTimeout(function(){ attempt(); }, 1000);
                        }
                        else {
                            _self.set('isFetchingToken', false);
                        }
                    });
            }

        },

        logout: function(){
            this.setProperties({
                token: null,
                model: null
            });
        }

    }

});