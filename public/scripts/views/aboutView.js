define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'text!aboutTemplate'
],
function(
	$,
	_,
	Backbone,
	utils,
	aboutTemplate
){
	
	'use strict';
	
	return Backbone.View.extend({
		template: _.template(aboutTemplate),
		tagName: 'section',
		className: 'page',
		id: 'about',

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



