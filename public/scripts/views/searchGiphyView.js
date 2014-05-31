define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'GiphyCollection',
	'text!searchGiphyTemplate',
	'text!gifListTemplate'
],
function(
	$,
	_,
	Backbone,
	utils,
	GiphyCollection,
	searchGiphyTemplate,
	gifListTemplate
){

	'use strict';

    var SearchGiphy = Backbone.View.extend({
		className: 'page',
		id: 'search-giphy',
		collection: GiphyCollection,
		template: _.template(searchGiphyTemplate),
		container: null,
		loading: false,
	    scroll: {},
		last:null,
		
		initialize: function () {
			this.render();
		},
	
		events: function() {
	        var events = {};
			events[ utils.clickEvt+ ' .cancel'] =  'toggleSearch';
			events[ 'submit form'] =  'searchSubmit';
			$('.scroll').scroll(this.handleScroll.bind(this));
	        return events;
	    },
	
		render: function () {
			this.$el.html(this.template());
			this.container = $('.search-giphy-container');
			this.container.html(this.$el);
			this.scroll = $(".scroll");
		},
		
		transition: function(){
			this.container.toggleClass('show');
		},
		
		close: function () {
			return this;
		},
		
		toggleSearch: function(e){
			e.preventDefault();
			e.stopPropagation();
 				setTimeout( function(){
				Backbone.Events.trigger('nav:toggleSearch');
			}, 100);
		},
		
		handleScroll: function(){
			var hgt = this.scroll.height();
			var thumbY = (this.last.offset().top);
			if( thumbY <= hgt ){
				this.collection.pageUp();
				this.loadResults();
			}
		},
		
		searchSubmit: function(e){
			e.preventDefault();
			var terms = $('input[type="search"]').val();
			this.collection.updateSearch(terms);
			this.loadResults();
		},
		
		loadResults: function(){
			if( this.loading) {
				return false;
			}
			var self = this;
			this.loading = true;
			Backbone.Events.trigger('network','busy');
			this.collection.fetch().success(function(thms){
	          	self.scroll.append(_.template(gifListTemplate, {thumbs: thms.images}));
				self.last = $(".view-giphy-thumb:last-child");
	          	self.loading = false;
				Backbone.Events.trigger('network','complete');
			});	
		}
    });

	return  SearchGiphy;
});
