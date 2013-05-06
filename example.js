// ====================================
// logger.js

// Logger
var logger = new (require('caterpillar').Logger)({level:7});
var output = logger
	.pipe(
		new (require('caterpillar-filter').Filter)()
	)
	.pipe(
		new (require('caterpillar-human').Human)()
	)
	.pipe(
		new (require('./').Browser)()
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