
<!-- TITLE/ -->

# Browser Transform for [Caterpillar](https://github.com/bevry/caterpillar)

<!-- /TITLE -->


<!-- BADGES/ -->

[![Build Status](http://img.shields.io/travis-ci/bevry/caterpillar-browser.png?branch=master)](http://travis-ci.org/bevry/caterpillar-browser "Check this project's build status on TravisCI")
[![NPM version](https://badge.fury.io/js/caterpillar-browser.png)](https://npmjs.org/package/caterpillar-browser "View this project on NPM")
[![Gittip donate button](http://img.shields.io/gittip/bevry.png)](https://www.gittip.com/bevry/ "Donate weekly to this project using Gittip")
[![Flattr donate button](https://raw.github.com/balupton/flattr-buttons/master/badge-89x18.gif)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](https://www.paypalobjects.com/en_AU/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

Use [Caterpillar](https://github.com/bevry/caterpillar) within Web Browsers! (even includes support for colors!)

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

## Install

### [Node](http://nodejs.org/), [Browserify](http://browserify.org/)
- Use: `require('caterpillar-browser')`
- Install: `npm install --save caterpillar-browser`

### [Ender](http://ender.jit.su/)
- Use: `require('caterpillar-browser')`
- Install: `ender add caterpillar-browser`

<!-- /INSTALL -->


## Usage

### Example

``` javascript
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
		require('caterpillar-browser').createBrowser()
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


<!-- HISTORY/ -->

## History
[Discover the change history by heading on over to the `History.md` file.](https://github.com/bevry/caterpillar-browser/blob/master/History.md#files)

<!-- /HISTORY -->


<!-- BACKERS/ -->

## Backers

### Maintainers

These amazing people are maintaining this project:

- Benjamin Lupton <b@lupton.cc> (https://github.com/balupton)

### Sponsors

No sponsors yet! Will you be the first?

[![Gittip donate button](http://img.shields.io/gittip/bevry.png)](https://www.gittip.com/bevry/ "Donate weekly to this project using Gittip")
[![Flattr donate button](https://raw.github.com/balupton/flattr-buttons/master/badge-89x18.gif)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](https://www.paypalobjects.com/en_AU/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")

### Contributors

These amazing people have contributed code to this project:

- Benjamin Lupton <b@lupton.cc> (https://github.com/balupton) - [view contributions](https://github.com/bevry/caterpillar-browser/commits?author=balupton)

[Become a contributor!](https://github.com/bevry/caterpillar-browser/blob/master/Contributing.md#files)

<!-- /BACKERS -->


<!-- LICENSE/ -->

## License

Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT license](http://creativecommons.org/licenses/MIT/)

Copyright &copy; 2013+ Bevry Pty Ltd <us@bevry.me> (http://bevry.me)

<!-- /LICENSE -->


