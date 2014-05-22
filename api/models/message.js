var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
	sender: String,
	recipient: String,
	textMessage: String,
	imgUrl: String,
	privacy: Number, 
	createdAt: Date
});

module.exports = mongoose.model('Message', MessageSchema);
