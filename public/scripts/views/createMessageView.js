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
		clickEvt: utils.clickType,

        initialize: function () {
		    _.bindAll(this, 'render', 'updateImg');
			this.render();
			this.model.bind('change:imageData', this.updateImg);
		},

	    events: function() {
	        var events = {};
			events[ 'submit #new-msg-form'] =  'submitMessage';
			events['change #new-msg-form'] = 'handleChange';
			events[ utils.clickEvt+ ' .cta-find-a-gif'] =  'toggleSearch';
	        return events;
	    },
	
		handleChange: function(e){
			var prop = e.target.name;
			var val = e.target.value;
			this.model.set({prop: val});
		},
	
		updateImg: function(){
			var img = this.model.get('imageData');
		   $('.cta-find-a-gif').addClass('found').css('background-image','url("'+img.small.url+'")');
		},
		
		showErrors: function( error ){
			_.each( error , function(e){
				utils.log( e.message );
			});
		},
		
		navigateToMessage: function(){
			var id = this.model.get('_id');
			setTimeout(function(){
				Backbone.Events.trigger('nav:message', id);
			}, 2000);
		},
		
		toggleSearch: function(e){
			e.preventDefault();
			Backbone.Events.trigger('nav:toggleSearch');
		},
		
		submitMessage: function(e){
			var self = this;
			
			var formData = {
				recipient:$('input[name="recipient"]').val(),
				textMessage:$('textarea[name="textMessage"]').val(),
				sender:$('input[name="sender"]').val()
			};

			var formResponse = {
				success: function(data){
					utils.log(data);
					$('.ui-message').fadeIn();
					self.navigateToMessage();
				},
				error: function(model, err){
					utils.log('Server Error: something went wrong trying to save  :  ' + err.responseText  );
				}
			};
			
			this.model.on('invalid', function(model, error) {
				self.showErrors(error);
			});

			this.model.save( formData, formResponse);
			e.preventDefault();
			
		},
		
		
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$frm = this.$el.find('form');
			return this;
		}

    });
});
