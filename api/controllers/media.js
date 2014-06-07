var http = require('http');
var host = "http://api.giphy.com";
var port = 80;

exports.load = function(req, res) {
	var url = req.params.url;
	
	var p = url.replace(host,'');
	console.log(p);
	if (url) {

	  var options = {
	    hostname: host,
	    port: port,
	    path: url,
	    method: 'GET'
	  };
	
	  var proxy = http.request(options, function (res) {
		console.log(res);
	    res.pipe(res, {
	      end: true
	    });
	  });
	  
	} else {
	  res.json("No url");
	}
};