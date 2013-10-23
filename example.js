// ====================================
// logger.js

// Logger
var logger = require('caterpillar').createLogger({level:7});
var output = logger
	.pipe(
		require('caterpillar-filter').createFilter()
	)
	.pipe(
		require('caterpillar-human').createHuman()
	)
	.pipe(
		require('./').createBrowser()
	);

// Export
module.exports = {
	logger:logger,
	log:logger.log.bind(logger)
};


// ====================================
// app.js

// Import
// var logger = require('./logger')

// Log
var logLevel, _i;
for (logLevel = _i = 0; _i <= 7; logLevel = ++_i) {
	logger.log(logLevel, "this is log level " + logLevel);
}