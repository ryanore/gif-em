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
		
		events: {},
		
		initialize: function () {
			this.render();
		},
		
		render: function () {
			console.log(this.model);
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
