var Message = require('../models/message');


// List all games
exports.list = function(req, res) {
	Message.find(function(err, msgs) {
		if (err)
			res.send(err);
		res.json(msgs);
	});
};


exports.create = function(req, res) {
	var msg = new Message(); 
	msg.sender = req.body.sender;
	msg.recipient = req.body.recipient;
	msg.textMessage = req.body.textMessage;
	msg.brightness = req.body.brightness || 0;
	msg.imageData = req.body.imageData || null;
	msg.privacy = req.body.privacy || 0;
	msg.createdAt = new Date();
	msg.save(function(err) {
		if (err){
			res.send(err);
		}
			
		res.json(msg);
	});
};




// List all games
exports.list = function(req, res) {
	Message.list({}, function(err, items) {
		if (err){
			res.send(err);
		}
		res.json(items);
	})
};



// Display One Game 
exports.load = function(req, res) {
	Message.load(req.params.id, function(err, item) {
		if (err){
			res.send(err);
		}
		res.json(item);
	});
};



exports.update = function(req,res){
	Message.findById(req.params.id, function(err, msg) {
	
		if (err){
			res.send(err);
		}
			
		msg.message = req.body.message; 	
		msg.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'msg updated!' });
		});
	});
};


exports.delete = function( req, res ){
	Message.remove({
		_id: req.params.id
	}, function(err, msg) {

		if (err)
			res.send(err);

		res.json({ message: msg });
	});
}

