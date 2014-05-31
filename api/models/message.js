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

MessageSchema.statics = {
	
	/**
	 * List Messages
	 *  - optional parameters to refine list,  otherwise all
	 */
	list: function(options, cb) {
		var criteria = options.criteria || {}
		this.find(criteria).sort({
			'createdAt': -1
		}) 
		.exec(cb)
	},
	
	
	/* Find by Id  */
	load: function(id, cb) {  
		this.findOne({
			_id: id
		}).exec(cb)
	}



}


module.exports = mongoose.model('Message', MessageSchema);
