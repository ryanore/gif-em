define([
	'jquery',
	'underscore',
	'backbone',
	'HomeView',
	'MessageModel',
	'MessageView',
	'AllMessagesView',
	'MessagesCollection',
	'CreateMessageView'
],function(
	$,
	_,
	Backbone,
	HomeView,
	Message,
	MessageView,
	AllMessagesView,
	MessagesCollection,
	CreateMessageView
){

	'use strict';

	var router;
	var currentView = null;
	var $navItems = $('.nav-btn');
	var $loadingDiv = $('#loading');
	var $content = $('#content');
	var $pages = $('.page');

	var AppRouter = Backbone.Router.extend({
		routes: {
			''              : 'home',
			'home'			: 'home',
			'message/:id'   : 'message',
			'messages'		: 'messages',
			'messages/new'	: 'newmessage',
			'*actions'		: 'defaultAction'
		}
	});


	// Listen to Backbone Router and Backbone Events for routing, treat them the same.
	var initialize = function(){
		router = new AppRouter();
	
		router.on('route:home', home );
		router.on('route:messages', messages );
		router.on('route:message', message );
		router.on('route:newmessage', newMessage );
		
		Backbone.Events.on('nav:home', home);
		Backbone.Events.on('nav:messages', messages);
		Backbone.Events.on('nav:message', message);
		Backbone.Events.on('nav:newmessage', newMessage);

		Backbone.history.start();
	};
	
	
	// Replaces the view with new content... after transition
	var setContent = function(view){
		currentView = view;
		console.log(view.el);
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
		selectMenuItem('nav-home');
		transition(function(){
			setContent( new HomeView() );
			router.navigate('home');
		});
	};

	var newMessage = function () {
		selectMenuItem();
		console.log('newMessage');
		transition(function(){
			var view = new CreateMessageView( { model: new Message() } );
			console.log(view);
			setContent( view );
			router.navigate('messages/new');
		});
	};

	var message = function ($id) {
		selectMenuItem();
		transition(function(){
			var message = new Message({id: $id});
			message.fetch({success: function(options){
				setContent( new MessageView({model: message}) );
				router.navigate('message/'+$id);
			}});
		});
	};

	var messages = function () {
		selectMenuItem();
		transition(function(){
			var msgList = new MessagesCollection();
			msgList.fetch({success: function(){
				setContent( new AllMessagesView({model: msgList}));
				router.navigate('messages');
			}});
		});
	};
	
	return {
		initialize: initialize
	};
});