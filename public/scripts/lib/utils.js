'use strict';
define(['jquery'],
function($){
	// avoid lint error, next line is temp
	$ = $;
	return {
		slug : function(value) {
			return value.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
		},
		log : function(content){
			if( ENV !== 'production'){
				console.log(content);
			}
		},
		isTouch: function(){
			return false;
		}
    };

});
