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
		initialize: function () {
			var o = this.get('original').height <= this.get('original').width   ?  'landscape' :  'portrait';
			this.set('orientation', o);
		}
    });

	return Giphy;
	
});

