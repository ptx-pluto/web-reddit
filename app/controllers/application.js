import Ember from 'ember';

export default Ember.Controller.extend({

    needs: ['account', 'search'],

    account: Ember.computed.alias('controllers.account'),

    search: Ember.computed.alias('controllers.search'),

    isFullscreen: true,

    actions: {

        toggleFullscreen: function(){
            this.toggleProperty('isFullscreen');
        }

    }

});
