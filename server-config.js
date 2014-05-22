// export NODE_ENV=development 
var env = process.env.NODE_ENV || 'development'

var environment_setup ={	
	production : {
		server : {port: process.env.PORT ||  3000, host: 'http://162.243.72.69'},
		db : process.env.MONGOLAB_URI || 'mongodb://localhost:27017/ntihya',
		cookie_secret : "cookiemonsterlovecookies"
	},
	development : {
		server : {port: process.env.PORT ||  3000, host: '127.0.0.1'},
		db : process.env.MONGOLAB_URI || 'mongodb://localhost:27017/ntihya',
		cookie_secret : "cookiemonsterlovecookies"
	}
};

var config = environment_setup[env];
	config.version = "0.0.1";
	config.appPath = "./api/ntihya";
	config.env = env;
exports = module.exports = config;
