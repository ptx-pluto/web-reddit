'use strict';

module.exports = Ember.View.extend({

    tagName: 'ul',

    classNames: ['subreddit__grid'],

    onChangeSize: function(){
        this.send('organize');
    }.observes('controller.length'),

    actions: {

        organize: function(){
            $('.js__grid-tile').wookmark({
                container: jQuery(this.get('element')),
                align: 'center',
                offset: 15
            });
        }

    }

});