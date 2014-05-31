define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'SearchGiphyView',
	'text!mainViewTemplate'
],
function(
	$,
	_,
	Backbone,
	utils,
	SearchGiphyView,
	mainTemplate
){
	
	'use strict';
	
	return Backbone.View.extend({
		template: _.template(mainTemplate),
		tagName: 'section',
		className: 'main',
		el: 'body',
		id: 'mainViewContainer',
		mainContent: {},
		currentView: null,
		searchView: null,
		loading: null,
		
		events: function() {
	        var events = {};
			events[ utils.clickEvt+ ' .main-nav li'] =  'handleNav';
			events[ utils.clickEvt+ ' .hamburger'] =  'toggleNav';
	        return events;
	    },
	   
		initialize:function () {
			var self = this;
			this.render();
			this.mainContent = this.$el.find('#content');
			this.nav = $('.main-nav');			
			this.loading = $('#loading');			
		},
		
		/*  MAIN NAVIGATION  */
		toggleNav: function(e){
			this.nav.toggleClass('extended');	
		},
		
		handleNav: function(e){
			this.nav.toggleClass('extended');
			var nav = $(e.target).data('nav');
			setTimeout(function(){
				Backbone.Events.trigger(nav);
			},300);
		},
		
		
		/* APP ROUTING,  PAGE TRANSITION */
		setContent: function(view){
			this.mainContent.html(view.el).stop().animate({opacity:1}, 200,function(){});
		},
		
		transition: function( clback ){
			if (this.currentView){
				this.currentView.close();
			}
			this.mainContent.stop().animate({opacity:0},200, clback );
		},
		
		showLoader: function(){
			this.loading.addClass('loading');
		},
		
		hideLoader: function(){
			this.loading.removeClass('loading');
		},
		
		toggleSearch: function( clback ){
			this.searchView.transition();
		},

        render:function () {
			this.$el.html(this.template());
			this.searchView = new SearchGiphyView();
		},
		
        close: function () {
			utils.log('close');
			return this;
		},
		
    });
});



