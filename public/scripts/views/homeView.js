define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'text!homeTemplate'
],
function(
	$,
	_,
	Backbone,
	utils,
	homeTemplate
){
	
	'use strict';
	
	return Backbone.View.extend({
		template: _.template(homeTemplate),
		tagName: 'section',
		className: 'page',
		id: 'home',
		
		events: function() {
	        var events = {};
			events[ utils.clickEvt+ ' .cta'] =  'navigate';
	        return events;
	    },
	
		navigate: function(e){
			var nav = $(e.target).data('nav');
			setTimeout(function(){
				Backbone.Events.trigger(nav);
			},300);
		},
		
		initialize:function () {
			this.render();
		},

        render:function () {
			var self = this;
			
			$(this.el).html(this.template());
			
			return this;
		},

        close: function () {
			utils.log('close');
			return this;
		}
    });
});



