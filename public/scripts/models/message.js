define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone){
	
	'use strict';

    return Backbone.Model.extend({
        urlRoot: '/message',
		defaults: {
			recipient: '',
			sender: '',
			textMessage: '',
			public: true,
			createdAt: new Date()
			
		},
		
		initialize: function () {
		},

		validate: function(attrs) {
			var errors = [];
		    if (!attrs.recipient) {
		        errors.push({name: 'recipient', message: 'Please add a recipient.'});
		    }
		    if (!attrs.sender) {
		        errors.push({name: 'sender', message: 'Please add a sender.'});
		    }
		    if (!attrs.textMessage) {
		        errors.push({name: 'textMessage', message: 'Please add a message.'});
		    }
		    return errors.length > 0 ? errors : false;
		}
	
    });

});
