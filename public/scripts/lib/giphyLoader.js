'use strict';
define(['jquery'],
function($){
	var GiphyLoader = function(){
		console.log('giphyloader');
	};
	
	GiphyLoader.prototype = {
		
		load: function(url, callback){

			var image = new Image();

			image.onLoad = function(){
				var canvas = document.createElement("canvas");
	            canvas.width = this.width;
	            canvas.height = this.height;

	            var ctx = canvas.getContext("2d");
	            ctx.drawImage(this,0,0);

	            var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
	            var data = imageData.data;
	            var r,g,b,avg;

	            for(var x = 0, len = data.length; x < len; x+=4) {
	                r = data[x];
	                g = data[x+1];
	                b = data[x+2];
	                avg = Math.floor((r+g+b)/3);
	                colorSum += avg;
	            }

	            var brightness = Math.floor(colorSum / (this.width*this.height));

	            // Send brighness level back to view
				console.log('giphyloader');
	
				callback(brightness);
			}

			image.src = url;
		}
		
    };

	return GiphyLoader;
});
