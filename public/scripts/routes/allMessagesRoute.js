define(['jquery','underscore', 'MessagesCollection',  'AllMessagesView'],
function($, _, MessagesCollection, AllMessagesView){
	'use strict';
  
	return {
		init: function(){
			var msgList = new MessagesCollection();
			
			var defer = $.Deferred();
			
			var renderPromise = defer.then(function(){
				return new AllMessagesView({model: msgList});
			});
			
			msgList.fetch({success: function(){
				defer.resolve();
			}});
			
			return renderPromise;
		}
	};

});
