define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'GiphyCollection',
	'GiphyView',
	'text!searchGiphyTemplate'
],
function(
	$,
	_,
	Backbone,
	utils,
	GiphyCollection,
	GiphyView,
	searchGiphyTemplate
){

	'use strict';

    var SearchGiphy = Backbone.View.extend({
		className: 'search-giphy',
		collection: GiphyCollection,
		template: _.template(searchGiphyTemplate),
		container: null,
	    scroll: null,
		last:null,
		loading: false,
		
		initialize: function () {
			this.render();
		},
	
		events: function() {
			$('.scroll').scroll(this.handleScroll.bind(this));
			this.collection.on('add', this.addOne.bind(this));
			var events = {};
			events[ utils.clickEvt+ ' .cancel'] =  'toggleSearch';
			events[ 'submit form'] =  'searchSubmit';
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
			var terms = $('input[type="search"]').val();
			e.preventDefault();
			this.scroll.html('');
			this.collection.updateSearch(terms);
			this.loadResults();
		},
		
		loadResults: function(){
			var self = this;
			if( this.loading) {
				return false;
			}
			this.loading = true;
			Backbone.Events.trigger('network','busy');
			this.collection.fetch({remove: false}).success(function(collection, resp){
	          	self.loading = false;
				Backbone.Events.trigger('network','complete');
			});	
		},
		
		addOne: function(gif) {
			var view = new GiphyView({model: gif});
            this.scroll.append(view.$el);
			this.last = view.$el;
	    }
    });

	return  SearchGiphy;
});
