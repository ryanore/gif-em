require.config({
    paths: {
		jquery:'../bower_components/jquery/dist/jquery',
		backbone:'../bower_components/backbone/backbone',
		underscore:'../bower_components/underscore/underscore',
		text:'../bower_components/requirejs-text/text',
		utils:'lib/utils',

		MessageModel:'models/message',
		MessagesCollection:'collections/messages',
        
		HomeView:'views/homeView',
		MessageView:'views/messageView',
		AllMessagesView:'views/allMessagesView',
		RecentMessagesView:'views/recentMessagesView',
		CreateMessageView:'views/createMessageView',

		homeTemplate:'templates/homeTemplate.ejs',
		messageTemplate:'templates/messageTemplate.ejs',
		allMessagesTemplate:'templates/allMessagesTemplate.ejs',
		createMessageTemplate:'templates/createMessageTemplate.ejs'
	},
    shim: { }
});

