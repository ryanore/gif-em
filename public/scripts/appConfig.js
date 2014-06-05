require.config({
    paths: {
		jquery:'../bower_components/jquery/dist/jquery',
		backbone:'../bower_components/backbone/backbone',
		underscore:'../bower_components/underscore/underscore',
		text:'../bower_components/requirejs-text/text',
		utils:'lib/utils',

		MessageModel:'models/message',
		GiphyModel:'models/giphy',
		
		MessagesCollection:'collections/messages',
		GiphyCollection:'collections/giphys',
        
		MainView:'views/_mainView',
		HomeView:'views/homeView',
		MessageView:'views/messageView',
		AllMessagesView:'views/allMessagesView',
		RecentMessagesView:'views/recentMessagesView',
		CreateMessageView:'views/createMessageView',
		SearchGiphyView:'views/searchGiphyView',
		GiphyView:'views/giphyView',

		mainViewTemplate:'templates/_mainViewTemplate.ejs',
		homeTemplate:'templates/homeTemplate.ejs',
		messageTemplate:'templates/messageTemplate.ejs',
		allMessagesTemplate:'templates/allMessagesTemplate.ejs',
		createMessageTemplate:'templates/createMessageTemplate.ejs',
		searchGiphyTemplate:'templates/searchGiphyTemplate.ejs',
		gifListTemplate:'templates/gifListTemplate.ejs',
	},
    shim: { }
});

