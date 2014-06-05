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
		
		url: function(){
			return "/giphy/search/" + this.searchTerms + "?limit="+this.limit + "&offset="+this.offset;
		},
		
		parse: function(data) {
			return data.images;
	    },

		pageUp: function(){
			this.offset += this.limit;
		},
	
		updateSearch: function(terms){
			this.reset();
			this.offset = 0;
			this.searchTerms = terms;
		}

    });

	return  new Giphys();
});
