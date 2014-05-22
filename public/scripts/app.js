define([
	'jquery',
	'underscore',
	'backbone',
	'appController'
],
function($, _, Backbone, Controller){
	
	'use strict';
	
	var initialize = function(){
		Controller.initialize();
	};
	return {
		initialize: initialize
	};
});