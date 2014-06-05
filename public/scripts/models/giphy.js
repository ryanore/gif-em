define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone){
	
	'use strict';
	
    var Giphy = Backbone.Model.extend({
        urlRoot: '/giphy',
		idAttribute: "id",
		defaults: {
			original:{},
			small:{}
		},
		initialize: function () {	}
    });

	return Giphy;
	
});

