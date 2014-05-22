// MessagesCollection
define(['jquery', 'underscore', 'backbone', 'MessageModel'], function($, _, Backbone, MessageModel){
	'use strict';
    return Backbone.Collection.extend({
        model: MessageModel,
		url: '/message'
    });
});
