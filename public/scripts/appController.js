define([
	'jquery',
	'underscore',
	'backbone',
	'MainView',
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
	MainView,
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

	var mainView = {};
	
	// Decoupled Router, minimal concerns
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
		mainView = new MainView();
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


	/**********************
	*** BEGIN  ROUTES *****
	**********************/
	var home = function () {
		mainView.transition(function(){
			mainView.setContent( new HomeView() );
			router.navigate('home');
		});
	};

	var newMessage = function () {
		mainView.transition(function(){
			var view = new CreateMessageView( { model: new Message() } );
			mainView.setContent( view );
			router.navigate('messages/new');
		});
	};

	var message = function ($id) {
		mainView.transition(function(){
			var message = new Message({id: $id});
			message.fetch({success: function(options){
				mainView.setContent( new MessageView({model: message}) );
				router.navigate('message/'+$id);
			}});
		});
	};

	var messages = function () {
		mainView.transition(function(){
			var msgList = new MessagesCollection();
			msgList.fetch({success: function(){
				mainView.setContent( new AllMessagesView({model: msgList}));
				router.navigate('messages');
			}});
		});
	};

	var searchGiphy = function () {
		mainView.transition(function(){
			mainView.setContent( new SearchGiphyView({model: GiphyCollection}));
			router.navigate('search-giphy');
		});
	};
	
	return {
		initialize: initialize
	};
});