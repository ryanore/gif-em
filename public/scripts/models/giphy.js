define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone){
	
	'use strict';
	
    var Giphy = Backbone.Model.extend({
        urlRoot: '/giphy',
		defaults: {},
		initialize: function () {
			console.log('init giphy model')
		}
    });

	return new Giphy();
	
});

