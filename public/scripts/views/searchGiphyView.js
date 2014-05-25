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
		
		template: _.template(searchGiphyTemplate),
		
		events: {
			'submit .giphy-search': "searchSubmit"
		},
		
		searchSubmit: function(e){
			var terms = $('input[type="search"]').val();
			$.getJSON('/giphy/search/'+terms, function(data){
				console.log(data);
			})
		},
		
		initialize: function () {
			this.render();
		},
		
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		
		close: function () {
			utils.log('close searchGiphyView');
			return this;
		}
    });


	return  SearchGiphy;
});
