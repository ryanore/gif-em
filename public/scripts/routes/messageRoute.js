define(['jquery', 'underscore', 'MessageModel', 'MessageView'],
function($, _, Message, MessageView){
	'use strict';
    return {
		init: function(id){
			var message = new Message({id: id});
			
			var defer = $.Deferred();
			
			var renderPromise = defer.then(function(){
				return new MessageView({model: message});
			});
	
			message.fetch({success: function(){
				defer.resolve();
			}});
	
			return renderPromise;
		}
	};
});