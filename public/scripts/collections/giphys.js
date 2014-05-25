// MessagesCollection
define(['jquery',
'underscore',
'backbone',
'GiphyModel'
], 
function($, _, Backbone, GiphyModel){
	
	'use strict';
	
    var Giphys =  Backbone.Collection.extend({
        model: GiphyModel,
		searchTerms: "mustache",
		selectedGiphy: null,
		
		url: function(){
			return "/giphy/search/"+this.searchTerms;
		},
		
		initialize: function(){},
	  	
		parse: function(data) {
			return data.images;
	    }
	

    });

	return  new Giphys();
});
