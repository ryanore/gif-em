// MessagesCollection
define(['jquery', 'underscore', 'backbone', 'GiphyModel'], function($, _, Backbone, GiphyModel){
	
	'use strict';
	
    var Giphys =  Backbone.Collection.extend({
        model: GiphyModel,
		url: function(){
			return "/giphy/search/"+this.searchTerms;
		},

		searchTerms: "mustache"

    });

	// return  Giphys;
	return  new Giphys();
});


// when a new Giphy is created it must be passed the id from the giphy data.

// remove collection.remove(models, [options])   REMOVES from collection, and fires  a "remove" event

// reset collection.reset([models], [options]) 	 EMPTIES collection and fires a 'reset' event

// push  collection.push(model, [options]) 

// fetch   When the model data returns from the server, it uses set to (intelligently) merge the fetched models, unless you pass {reset: true}, in which case the collection will be (efficiently) reset.