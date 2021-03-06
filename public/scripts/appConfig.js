require.config({
    paths: {
		jquery:'../bower_components/jquery/dist/jquery',
		backbone:'../bower_components/backbone/backbone',
		underscore:'../bower_components/underscore/underscore',
		text:'../bower_components/requirejs-text/text',
		utils:'lib/utils',
		GiphyLoader:'lib/giphyLoader',

		MessageModel:'models/message',
		GiphyModel:'models/giphy',
		
		MessagesCollection:'collections/messages',
		GiphyCollection:'collections/giphys',
        
		MainView:'views/_mainView',
		HomeView:'views/homeView',
		AboutView:'views/aboutView',
		MessageView:'views/messageView',
		AllMessagesView:'views/allMessagesView',
		RecentMessagesView:'views/recentMessagesView',
		NewMessageView:'views/newMessageView',
		SearchGiphyView:'views/searchGiphyView',
		GiphyView:'views/giphyView',

		mainViewTemplate:'templates/_mainViewTemplate.ejs',
		homeTemplate:'templates/homeTemplate.ejs',
		aboutTemplate:'templates/aboutTemplate.ejs',
		messageTemplate:'templates/messageTemplate.ejs',
		allMessagesTemplate:'templates/allMessagesTemplate.ejs',
		newMessageTemplate:'templates/newMessageTemplate.ejs',
		searchGiphyTemplate:'templates/searchGiphyTemplate.ejs',
		giphyTemplate:'templates/giphyTemplate.ejs'
	},
    shim: { }
});

