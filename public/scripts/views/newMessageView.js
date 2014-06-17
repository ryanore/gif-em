// GameView
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'text!newMessageTemplate'
],
function(
	$,
	_,
	Backbone,
	utils,
	newMessageTemplate
){
	
	'use strict';

    return Backbone.View.extend({
		template: _.template(newMessageTemplate),
		tagName: 'section',
		className: 'module',
		id: 'create-msg',
		$frm: {},
		$top: null,
		$bottom: null,
		$capTop: null,
		$capBottom: null,
		clickEvt: utils.clickType,

        initialize: function () {
		    _.bindAll(this, 'render', 'updateImg');
			this.render();
			this.model.bind('change:imageData', this.updateImg);
			this.$frm = this.$el.find('form');
		},

	    events: function() {
	        var events = {};
			events[ 'submit #new-msg-form'] =  'submitMessage';
			events['input #new-msg-form'] = 'handleInput';
			events[ utils.clickEvt+ ' .searchGifs'] =  'toggleSearch';
	        return events;
	    },
	
		updateImg: function(){
			var img = this.model.get('imageData');
			this.render();
			this.updateText();
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
		
		updateText: function(){
			var t = this.$capTop.val();
			this.$top.html(t).css('font-size', this.getFontSize(t) );
			
			t = this.$capBottom.val();
			this.$bottom.html(t).css('font-size', this.getFontSize(t) );
		},
		
		handleInput: function(e){
			var t = e.target;

			if(t.name==="captionTop" ){
				this.model.set({tempTop: t.value});
			}		
		
			if(t.name==="captionBottom" ){
				this.model.set({tempBottom: t.value});
			}
					
			if( t.value.length > 0 && this.model.get('imageData') ){
				this.$submit.addClass('show');
			}else{
				this.$submit.removeClass('show');
			}
			
			this.updateText();
		},
	
		getFontSize: function(txt){
			if( !txt) return 0;
			
			var count = txt.length;
			
			return 1- (count/40) + 'em';
		},
		
		submitMessage: function(e){
			var self = this;
			var formData = {
				captionTop: $('input[name="captionTop"]').val(),
				captionBottom: $('input[name="captionBottom"]').val()
			};
			
			this.model.on('invalid', function(model, error) {
				self.showErrors(error);
			});
			
			this.model.save( formData, {
				success: function(data){
					$('.ui-message').fadeIn();
					self.navigateToMessage();
				},
				error: function(model, err){
					console.log('Server Error: something went wrong trying to save  :  ' + err.responseText  );
				}
			});
			
			e.preventDefault();
		},
		
		
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$top = this.$el.find('.top');
			this.$capTop = this.$el.find('#captionTop');
			this.$bottom = this.$el.find('.bottom');
			this.$capBottom = this.$el.find('#captionBottom');
			this.$submit = this.$el.find('input[type="submit"]');
			return this;
		}

    });
});
