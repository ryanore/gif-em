
var Gifem = (function(){
	
	var Messages = require('./controllers/message');
	var Giphy = require('./controllers/giphy');
	var Media = require('./controllers/media');
	
	return {
	
		init: function(router){
			router.route('/message')
				.post( Messages.create )
				.get( Messages.list );

			router.route('/giphy')
				.get( Giphy.trending );

			router.route('/giphy/search/:terms')
				.get( Giphy.search );

			router.route('/message/:id')
				.get( Messages.load )
				.put( Messages.update )
				.delete( Messages.delete );

			router.route('/media/load')
				.get( Media.proxy );
	
		}
	}


})();

module.exports = Gifem;

