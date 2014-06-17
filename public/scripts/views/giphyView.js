define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'text!giphyTemplate'
],
function(
	$,
	_,
	Backbone,
	utils,
	giphyTemplate
){
	
	'use strict';
	
	return Backbone.View.extend({
		tagName: 'div',
		className: 'view-giphy-thumb',
		template: _.template(giphyTemplate),
		loader: null,
		image: null,
		btn_select: null,
		
		events: function() {
	        var events = {};
			events['click'] =  'handleClick';
			events[utils.clickEvt+ ' button'] =  'handleSelection';
	        return events;
	    },
	
		
		initialize:function () {
			this.loader = new Image();

			this.render();
			
		},

		handleSelection: function(e){
			var self = this;
			setTimeout( function(){
				Backbone.Events.trigger('message:giphySelected', self.model);
			}, 300);
		},

		handleClick: function(e){
			var self = this;
			
			if( this.image.data('loaded') ) return false;
			
			var url = self.model.get("small").url;
			
			$(this.loader).on('load' , function(){
				self.image.css({
					'background-image': "url("+url+")"
				}).data('loaded',true)
				  .removeClass('loading');
				
				self.btn_select.addClass('show');
			});
			
			this.loader.src=url;
			this.image.addClass('loading');
		},
		
		
        render:function () {
			var self = this;
			
			this.$el.html(this.template(this.model.toJSON()));

			this.btn_select = this.$el.find('button');

			this.image = this.$el.find('.image').css({
				'background-image': "url("+self.model.get("small").still+")"
			});
			
			return this;
		},

        close: function () {
			return this;
		}
    });
});



