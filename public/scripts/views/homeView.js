define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'CreateMessageView',
	'RecentMessagesView',
	'MessagesCollection',
	'text!homeTemplate',
	'MessageModel'
],
function(
	$,
	_,
	Backbone,
	utils,
	CreateMessageView,
	RecentMessagesView,
	MessagesCollection,
	homeTemplate,
	MessageModel
){
	
	'use strict';
	
	return Backbone.View.extend({
		template: _.template(homeTemplate),
		tagName: 'section',
		className: 'page',
		id: 'home',
		create: new CreateMessageView({model: new MessageModel()}),
		recent: new RecentMessagesView({model: new MessagesCollection()}),

		
		initialize:function () {
			this.render();
		},


        render:function () {
			console.log("RENDER HOME");
			var self = this;
			$(this.el).html(this.template());
			
			var createContainer = $(this.el).find('#create-message');
			createContainer.append(this.create.el);
			
			var prevContainer = $(this.el).find('#previous-messages');
			prevContainer.append(this.recent.el);
			
			this.recent.model.fetch( {
				success: function(){
					self.recent.render();
				}
			});
			
			return this;
		},


        close: function () {
			utils.log('close');
		}

    });
});



