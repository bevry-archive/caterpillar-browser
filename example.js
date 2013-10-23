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
	logger: logger,
	log: logger.log.bind(logger)
};


// ====================================
// app.js

// Import
// var logger = require('./logger')

// Log messages
logger.log('emergency', 'this is level 0');
logger.log('emerg', 'this is level 0');
logger.log('alert', 'this is level 1');
logger.log('critical', 'this is level 2');
logger.log('crit', 'this is level 2');
logger.log('error', 'this is level 3');
logger.log('err', 'this is level 3');
logger.log('warning', 'this is level 4');
logger.log('warn', 'this is level 4');
logger.log('notice', 'this is level 5');
logger.log('note', 'this is level 5');
logger.log('info', 'this is level 6');
logger.log('default', 'this is level 6');
logger.log('debug', 'this is level 7');
logger.log('this is level 6, the default level');
logger.log('you','can','also','use','as','many','arguments','as','you','want',1,[2,3],{four:5});
