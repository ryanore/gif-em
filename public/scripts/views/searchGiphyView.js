define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'GiphyCollection',
	'text!searchGiphyTemplate'
],
function(
	$,
	_,
	Backbone,
	utils,
	GiphyCollection,
	searchGiphyTemplate
){

	'use strict';

    var SearchGiphy = Backbone.View.extend({
		tagName: 'section',
		className: 'page',
		id: 'search-giphy',
		collection: GiphyCollection,
		
		template: _.template(searchGiphyTemplate),
		
		events: {
			'submit .giphy-search': "searchSubmit"
		},
		
		searchSubmit: function(e){
			e.preventDefault();
			var self = this;
			var terms = $('input[type="search"]').val();
			this.collection.searchTerms = terms;
			this.collection.fetch().success(function(){
				self.render();
			});
		},
		
		initialize: function () {
			this.collection.on ('change',this.render, this);
			this.render();
		},
		
		render: function () {
			var thms = this.collection.toJSON();
			this.$el.html(this.template({thumbs: thms}));
			return this;
		},
		
		close: function () {
			utils.log('close searchGiphyView');
			return this;
		}
    });


	return  SearchGiphy;
});
