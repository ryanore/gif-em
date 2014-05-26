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



