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
		
		initialize: function () {
			this.render();
        },

        render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.msg = $('.msg-body');
			setTimeout(function(){
				$('.msg-body').animate({opacity:1},function(){
					$('[data-fade]').addClass('show');
				});
			}, 2000);
			return this;
        },

		close: function () {
			return this;
		}

	});
});



