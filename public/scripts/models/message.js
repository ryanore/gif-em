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
			imageData: {},
			createdAt: new Date()
		},
	
	
		initialize: function () {
		},

		setImageData: function(img){
			var a = _(this.attributes).clone();
			a.imageData = img;
		},
		
		formatDate: function(){
			var year = new Date(this.get('createdAt'));
			return year.toLocaleDateString();
		},
		
		toJSON: function() {
		    var a = _(this.attributes).clone();
		    a.formattedDate = this.formatDate();
		    return a;
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
		    if (!attrs.imageData) {
		        errors.push({name: 'imageData', message: 'Please add a GIF.'});
		    }
		    return errors.length > 0 ? errors : false;
		}
	
    });

});
