var URL = require('url'),
    http = require('http'),
    request = require('request').defaults({ encoding: null});

exports.proxy = function(req, res){
	var _url = URL.parse(req.url,true);
	var u = _url.query.u;
	var requestUrl  = URL.parse(u,true);

	var options = {
	    url: requestUrl,
	    port: 80,
	    method: 'GET'
	};

	request.get(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
	        res.send(data);
	    }else{
			console.log(error);
		}
	});
	
}
