define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'text!allMessagesTemplate'
],
function(
	$,
	_,
	Backbone,
	utils,
	allMessagesTemplate
){

	'use strict';

    return Backbone.View.extend({
		tagName: 'section',
		className: 'module',
		id: 'all-messages',
		
		template: _.template(allMessagesTemplate),

		events: {
			'click .view-message-cta'   : 'navigateToMessage'
		},
		
		initialize: function () {
			this.render();
		},

		navigateToMessage: function(e){
			e.preventDefault();
			var id = $(e.currentTarget).data('id');
			Backbone.Events.trigger('nav:message', id);
		},

		render: function () {
			var msgs = this.model.toJSON();
			$(this.el).html(this.template({messages: msgs}));
			return this;
		},

		close: function () {
			utils.log('close');
			return this;
		}

    });
});
