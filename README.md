# Browser Transform for [Caterpillar](https://github.com/bevry/caterpillar)

[![Build Status](https://secure.travis-ci.org/bevry/caterpillar-browser.png?branch=master)](http://travis-ci.org/bevry/caterpillar-browser)
[![NPM version](https://badge.fury.io/js/caterpillar-browser.png)](https://npmjs.org/package/caterpillar-browser)
[![Flattr this project](https://raw.github.com/balupton/flattr-buttons/master/badge-89x18.gif)](http://flattr.com/thing/344188/balupton-on-Flattr)

Use [Caterpillar](https://github.com/bevry/caterpillar) within Web Browsers! (even includes support for colors!)



## Install

### Backend

1. [Install Node.js](http://bevry.me/node/install)
2. `npm install --save caterpillar-browser`

### Frontend

1. [See Browserify](http://browserify.org/)



## Usage

### Example

``` javascript
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
		new (require('caterpillar-browser').Browser)()
	);

// Export
module.exports = {
	logger:logger,
	log:logger.log.bind(logger)
};


// ====================================
// app.js

// Import
var logger = require('./logger')

// Log
var logLevel, _i;
for (logLevel = _i = 0; _i <= 7; logLevel = ++_i) {
	logger.log(logLevel, "this is log level " + logLevel);
}
```

Result in Google Chrome (also works in Firefox)

<img src="http://d.pr/i/uqsm+"/>


### Browser API, extends [caterpillar.Transform](https://github.com/bevry/caterpillar), which extends [stream.Transform](http://nodejs.org/api/stream.html#stream_class_stream_transform)

``` javascript
new (require('caterpillar-browser').Browser)(config)
```

- Methods
	- `constructor(config?)` create our new browser instance with the config, config is optional
	- `pipe(child)` pipe our stream to the child, also sync our config to it
	- `setConfig(config)` set the configuration and emit the `config` event
	- `getConfig()` get the configuration
	- `format(entry)` format the caterpillar human readable logger entry (returns an Array)
- Configuration
	- `write` boolean, defaults to `true`, whether or not we should write directly to the browser's console
	- `color` boolean, defaults to `true`, set to `false` to turn off colors
	- `styles` objects of the level to color mapping, defaults to:
		
		``` javascript
		{
			red: {
				start: 31,
				end: 39,
				value: 'color:red'
			},
			yellow: {
				start: 33,
				end: 39,
				value: 'color:orange'
			},
			green: {
				start: 32,
				end: 39,
				value: 'color:green'
			},
			bright: {
				start: 1,
				end: 22,
				value: 'font-weight:bold'
			},
			dim: {
				start: 2,
				end: 22,
				value: 'color:lightGray'
			},
			italic: {
				start: 3,
				end: 23,
				value: 'font-style:italic'
			},
			underline: {
				start: 4,
				end: 24,
				value: 'text-decoration:underline'
			}
		}
		```

- Events
	- `config(config)` emitted once our configuration has updated



## History
You can discover the history inside the [History.md](https://github.com/bevry/caterpillar-browser/blob/master/History.md#files) file



## License
Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT License](http://creativecommons.org/licenses/MIT/)
<br/>Copyright &copy; 2013+ [Bevry Pty Ltd](http://bevry.me)
