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
		
		initialize: function () {
			_.bindAll(this, 'render');
			this.render();
        },

        render: function () {
	console.log('RENDER MESSAGE');
			this.$el.html(this.template(this.model.toJSON()));
			return this;
        },

		// Clean UP
		close: function () {
		}

	});
});



