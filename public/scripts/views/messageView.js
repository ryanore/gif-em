// Message View
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'MessageModel',
	'MessageView',
	'text!messageTemplate'
],
function(
	$,
	_,
	Backbone,
	utils,
	MessageModel,
	MessageView,
	messageTemplate
){
	
	'use strict';

	return Backbone.View.extend({
		template: _.template(messageTemplate),
		tagName: 'section',
		className: 'page',
		id: 'message',
		
		events: function() {
	        var events = {};
		    return events;
	    },
	    
		initialize: function () {
			_.bindAll(this, 'render');
			this.render();
        },

        render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			setTimeout(function(){
				$('.msg-body').animate({opacity:1},function(){
					$('[data-fade]').addClass('show');
				})
				
			}, 2000);			
			return this;
        },

		// Clean UP
		close: function () {
			return this;
		}

	});
});



