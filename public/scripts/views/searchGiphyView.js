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
		className: 'page',
		id: 'search-giphy',
		collection: GiphyCollection,
		template: _.template(searchGiphyTemplate),
		container: null,
		
		events: {
			'submit .giphy-search': "searchSubmit",
			'click .cancel, mousedown .cancel': "toggleSearch"
		},
		
		initialize: function () {
			this.collection.on ('change',this.render, this);
			this.render();
		},
		
		render: function () {
			var thms = this.collection.toJSON();
			this.$el.html(this.template({thumbs: thms}));
			this.container = $('.search-giphy-container');
			this.container.html(this.$el);
			
			return this;
		},
		
		transition: function(){
			this.container.toggleClass('show');
		},
		
		close: function () {
			return this;
		},
		
		toggleSearch: function(e){
			Backbone.Events.trigger('nav:toggleSearch');
		},
		
		
		searchSubmit: function(e){
			e.preventDefault();
			var self = this;
			var terms = $('input[type="search"]').val();
			this.collection.searchTerms = terms;
			this.collection.fetch().success(function(){
				self.render();
			});
		}
    });


	return  SearchGiphy;
	
});
