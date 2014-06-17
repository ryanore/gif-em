define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone){
	
	'use strict';

    return Backbone.Model.extend({
        urlRoot: '/message',
		defaults: {
			tempTop: '',
			tempBottom: '',
			brightness: 0,
			public: true,
			createdAt: new Date()
		},
	
	
		initialize: function () {	
		
		},
		
		getFontSize: function(txt){
			var text = this.get(txt);
			if( !text ) return 0;
			
			var count = text.length;
			return 1- (count/100) + 'em';
		},

		setImageData: function(img){
			var a = _(this.attributes).clone();
			a.imageData = img;
		},
		
		formatDate: function(){
			var year = new Date(this.get('createdAt'));
			return year.toLocaleDateString();
		},
		
		toJSON: function() {
		    var a = _(this.attributes).clone();
		    a.formattedDate = this.formatDate();
			a.topSize = this.getFontSize('captionTop');
			a.bottomSize = this.getFontSize('captionBottom');
		    return a;
		},
	
		validate: function(attrs) {
			var errors = [];
		    if (!attrs.captionTop  &&  !attrs.captionBottom) {
		        errors.push({name: 'caption', message: 'Please add a caption.'});
		    }
		    if (!attrs.imageData) {
		        errors.push({name: 'imageData', message: 'Please add a Gif.'});
		    }
		    return errors.length > 0 ? errors : false;
		}
	
    });

});
