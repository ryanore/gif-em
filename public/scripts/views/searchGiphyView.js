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
			var triggerPoint = utils.isTouch? 10 : 10;
	        if( !this.loading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight ) {
				this.collection.pageUp();
				this.fetchGiphy();
	        }
		},
		
		searchSubmit: function(e){
			e.preventDefault();
			var terms = $('input[type="search"]').val();
			this.collection.updateSearch(terms);
			this.fetchGiphy();
		},
		
		fetchGiphy: function(){
			var self = this;
			self.loading = true;
			this.collection.fetch().success(function(){
				var thms = self.collection.toJSON();
	          	$('.scroll').append(_.template(gifListTemplate, {thumbs: thms}));
	          	self.loading = false;
			});	
		}
    });

	return  SearchGiphy;
	
});
