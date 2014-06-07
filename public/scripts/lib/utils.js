'use strict';
define(['jquery'],
function($){
	var Utils = function(){
		this.clickEvt = this.isTouch() ? 'touchstart' : 'click';
		console.log(this.clickEvt);
		
	};
	
	
	
	Utils.prototype = {
		slug : function(value) {
			return value.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
		},
		log : function(content){
			if( ENV !== 'production'){
				console.log(content);
			}
		},
		isTouch: function(){
			return 'ontouchstart' in window || 'onmsgesturechange' in window; // works on ie10
		}
    };

	return new Utils();
});
