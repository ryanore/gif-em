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
		limit: 10,
		offset: 0,
		selectedGiphy: null,
		
		url: function(){
			return "/giphy/search/" + this.searchTerms + "?limit="+this.limit + "&offset="+this.offset;
		},
		
		initialize: function(){},
	  	
		parse: function(data) {
			return data.images;
	    },
	
		updateSearch: function(terms){
			this.offset = 0;
			this.searchTerms = terms;
		},
		pageUp: function(){
			this.offset += this.limit;
		}
	

    });

	return  new Giphys();
});
