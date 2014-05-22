
var Ntihya = (function(){
	
	var Messages = require('./controllers/message');
	
	return {
	
		init: function(router){
			/* Routes */
			router.route('/message')
				.post( Messages.create )
				.get( Messages.list );

			router.route('/message/:id')
				.get( Messages.load )
				.put( Messages.update )
				.delete( Messages.delete );
			
		}
	}


})();

module.exports = Ntihya;

