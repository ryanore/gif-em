var http = require('http');
var host = "http://api.giphy.com";
var port = 80;
var api_key = "dc6zaTOxFJmzC"; 


var makeRequest = function(requestString, callback){
	http.get(host+requestString, function(resp) {
		var body = '';
	    resp.on('data', function(chunk) {
	        body += chunk;
	    });
	    resp.on('end', function() {
	        callback(body)
	    });
	})
	.on('error', function(e) {
	  console.log("Got error: " + e.message);
	  callback(e)
	});
};


var buildGiphyData = function(data, callback){
	var giphyData = JSON.parse(data);
	var images = [];
	var d = giphyData.data;
	for( var i=0; i<d.length; i++ ){
		var img = d[i];
		images.push({
			id: img.id,
			original: img.images.original,
			small: {
				still: img.images.fixed_height_still.url,			
				url: img.images.fixed_height.url
			}
		});
	}
	var d = {
		pagination: giphyData.pagination,
		meta: giphyData.meta,
		images: images
	};
	callback(d);
};



/*
*	Trending data from  Giphy API
*	https://github.com/Giphy/GiphyAPI
*/
exports.trending = function(req, res){
	var requestString = '/v1/gifs/trending?'+ "&api_key="+api_key;
	 	makeRequest(requestString, function(data){
		buildGiphyData(data, function(giphy){
			res.json(giphy);
		});
	});
};



/*
*	Search Giphy API
*	https://github.com/Giphy/GiphyAPI
*/
exports.search = function(req, res) {
	var terms = req.params.terms.toLowerCase().replace(/[^a-z0-9]+/g,'+');
	var offset = req.params.offset || 0;
	var limit = req.params.limit || 10;
	var requestString = '/v1/gifs/search?'
		+ "q=" + terms 
		+ "&offset="+offset
		+ "&limit="+limit
		+ "&api_key="+api_key;
	
 	makeRequest(requestString, function(data){
 		buildGiphyData(data, function(giphy){
 			res.json(giphy);
 		});
 	});
};

