"use strict";

module.exports = function(App){

    App.FeedGridView = require('./views/FeedGridView.js');
    App.FeedTileView = require('./views/FeedTileView.js');
    App.SubredditView = require('./views/SubredditView.js');
    App.SidebarView = require('./views/SidebarView.js');
    App.ImageThumbnailView = require('./views/ImageThumbnailView.js');
    App.CommentTreeView = require('./views/CommentTreeView.js');
};