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
	msg.privacy = req.body.privacy || 0;
	msg.createdAt = new Date();
	msg.save(function(err) {
		if (err){
			res.send(err);
		}
			
		res.json(msg);
	});
};


exports.load = function(req, res) {
	Message.findById(req.params.id, function(err, msg) {
		if (err){
			res.send(err);
		}
			
		res.json(msg);
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

