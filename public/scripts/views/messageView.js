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
		msg: null,
		
		events: function() {
	        var events = {};
			events[ utils.clickEvt+ ' .close'] =  'closeMsg';
		    return events;
	    },
	
		closeMsg: function() {
			console.log('fadeout');
			$('.msg-body').fadeOut();
		},
	    
		initialize: function () {
			_.bindAll(this, 'render');
			this.render();
        },

        render: function () {
	console.log(this.model.toJSON());
			this.$el.html(this.template(this.model.toJSON()));
			this.msg = $('.msg-body');
			var self = this;
			setTimeout(function(){
				$('.msg-body').animate({opacity:1},function(){
					$('[data-fade]').addClass('show');
				});
			}, 2000);
			return this;
        },

		// Clean UP
		close: function () {
			return this;
		}

	});
});



