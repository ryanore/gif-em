define([
	'jquery',
	'underscore',
	'backbone',
	'HomeView',
	'MessageModel',
	'MessageView',
	'AllMessagesView',
	'MessagesCollection',
	'CreateMessageView',
	'SearchGiphyView',
	'GiphyCollection'
],function(
	$,
	_,
	Backbone,
	HomeView,
	Message,
	MessageView,
	AllMessagesView,
	MessagesCollection,
	CreateMessageView,
	SearchGiphyView,
	GiphyCollection
){

	'use strict';

	var router;
	var currentView = null;
	var $navItems = $('.nav-btn');
	var $loadingDiv = $('#loading');
	var $content = $('#content');
	var $pages = $('.page');
	var $giphySearch = {};

	var AppRouter = Backbone.Router.extend({
		routes: {
			''              : 'home',
			'home'			: 'home',
			'message/:id'   : 'message',
			'messages'		: 'messages',
			'messages/new'	: 'newMessage',
			'search-giphy'	: 'searchGiphy',
			'*actions'		: 'defaultAction'
		}
	});


	// Listen to Backbone Router and Backbone Events for routing, treat them the same.
	var initialize = function(){
		router = new AppRouter();
	
		router.on('route:home', home );
		router.on('route:messages', messages );
		router.on('route:message', message );
		router.on('route:newMessage', newMessage );
		router.on('route:searchGiphy', searchGiphy );
		
		Backbone.Events.on('nav:home', home);
		Backbone.Events.on('nav:messages', messages);
		Backbone.Events.on('nav:message', message);
		Backbone.Events.on('nav:newMessage', newMessage);
		Backbone.Events.on('nav:searchGiphy', searchGiphy);

		Backbone.history.start();
	};
	
	
	// Replaces the view with new content... after transition
	var setContent = function(view){
		currentView = view;
		$content.html(view.el).stop().animate({opacity:1}, 200,function(){});
    };

	var transition = function( clback ){
		if (currentView){
			currentView.close();
		}
		$content.stop().animate({opacity:0},200, clback );
	};

	var selectMenuItem = function(menuItem){
		$('.nav-btn').removeClass('active');
		if (menuItem) {
			$navItems.filter('.' + menuItem).addClass('active');
		}
	};


	/**********************
	*** BEGIN  ROUTES *****
	**********************/
	var home = function () {
		transition(function(){
			setContent( new HomeView() );
			router.navigate('home');
		});
	};

	var newMessage = function () {
		transition(function(){
			var view = new CreateMessageView( { model: new Message() } );
			setContent( view );
			router.navigate('messages/new');
		});
	};

	var message = function ($id) {
		transition(function(){
			var message = new Message({id: $id});
			message.fetch({success: function(options){
				setContent( new MessageView({model: message}) );
				router.navigate('message/'+$id);
			}});
		});
	};

	var messages = function () {
		transition(function(){
			var msgList = new MessagesCollection();
			msgList.fetch({success: function(){
				setContent( new AllMessagesView({model: msgList}));
				router.navigate('messages');
			}});
		});
	};

	var searchGiphy = function () {
		transition(function(){
			// var gifs = new GiphyCollection();
			setContent( new SearchGiphyView({model: GiphyCollection}));
			router.navigate('search-giphy');
		});
	};
	
	return {
		initialize: initialize
	};
});