// GameView
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'text!createMessageTemplate'
],
function(
	$,
	_,
	Backbone,
	utils,
	createMessageTemplate
){
	
	'use strict';

    return Backbone.View.extend({
		template: _.template(createMessageTemplate),
		tagName: 'section',
		className: 'module',
		id: 'create-msg',
		teams: [],
		$frm: {},

        initialize: function () {
		    _.bindAll(this, 'render');
			this.render();
		},

		events: {
			'submit #new-msg-form'   : 'submitMessage',
			'click .view-message-cta'   : 'navigateToMessage'
		},


		showErrors: function( error ){
			_.each( error , function(e){
				utils.log( e.message );
			});
		},
		
		navigateToMessage: function(e){
			e.preventDefault();
			var id = $(e.currentTarget).data('id');
			Backbone.Events.trigger('nav:message', id);
		},
		
		showSuccess: function(){
			this.$el.find('textarea').val('');
		},

		submitMessage: function(e){
			e.preventDefault();
			var self = this;
			var formData = {
				recipient:$('input[name="recipient"]').val(),
				textMessage:$('textarea[name="textMessage"]').val(),
				sender:$('input[name="sender"]').val()
			};

			var formResponse = {
				success: function(data){
					utils.log(data);
					self.showSuccess();
				},
				error: function(model, err){
					utils.log('Server Error: something went wrong trying to save  :  ' + err.responseText  );
				}
			};
			
			this.model.on('invalid', function(model, error) {
				self.showErrors(error);
			});

			this.model.save( formData, formResponse);
		},
		
		
		render: function () {
			$(this.el).html(this.template());
			this.$frm = this.$el.find('form');
			return this;
		}

    });
});
