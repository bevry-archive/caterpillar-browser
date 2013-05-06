# Import
{expect} = require('chai')
joe = require('joe')
{Logger} = require('caterpillar')
{Browser} = require('../../')
{Human} = require('caterpillar-human')
{PassThrough} = require('readable-stream')

# Prepare
cleanChanging = (item) ->
	item
		.replace(/\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}\]/, 'date')
		.replace(/\[[\/\\].+?:\d{1,}\]/, 'file')
		.replace(/\[[\d\w\.]+?\]/, 'method')

# Test
joe.describe 'browser', (describe,it) ->

	describe 'transform', (describe,it) ->
		transform = null

		it 'should instantiate correctly', ->
			transform = new Browser()


	describe 'logging without colors', (describe,it) ->
		logger = new Logger(level:7)
		human = new Human()
		transform = new Browser()
		output = new PassThrough()
		actual = []
		expected =
			[ '["emergency: this is emergency and is level 0\\n    → [2013-05-06 20:41:13.973] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
			'["alert: this is alert and is level 1\\n    → [2013-05-06 20:41:13.978] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
			'["critical: this is critical and is level 2\\n    → [2013-05-06 20:41:13.978] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
			'["error: this is error and is level 3\\n    → [2013-05-06 20:41:13.979] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
			'["warning: this is warning and is level 4\\n    → [2013-05-06 20:41:13.979] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
			'["notice: this is notice and is level 5\\n    → [2013-05-06 20:41:13.980] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
			'["info: this is info and is level 6\\n    → [2013-05-06 20:41:13.980] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
			'["debug: this is debug and is level 7\\n    → [2013-05-06 20:41:13.981] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
			'["emergency: this is emerg and is level 0\\n    → [2013-05-06 20:41:13.982] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
			'["critical: this is crit and is level 2\\n    → [2013-05-06 20:41:13.982] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
			'["error: this is err and is level 3\\n    → [2013-05-06 20:41:13.982] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
			'["warning: this is warn and is level 4\\n    → [2013-05-06 20:41:13.983] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
			'["notice: this is note and is level 5\\n    → [2013-05-06 20:41:13.983] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
			'["info: this is default and is level 6\\n    → [2013-05-06 20:41:13.984] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]' ]

		# Clean up
		expected = expected.map(cleanChanging)

		output.on 'data', (chunk) ->
			actual.push chunk.toString()

		it 'should pipe correctly', ->
			logger.pipe(human).pipe(transform).pipe(output)
			transform.setConfig(write:false,color:false)

		it 'should log messages', ->
			for own name,code of Logger::config.levels
				message = "this is #{name} and is level #{code}"
				logger.log(name, message)

		it 'should provide the expected output', (done) ->
			output.on 'end', ->
				#console.log actual
				actual = actual.map(cleanChanging)
				expect(actual.length).to.equal(expected.length)
				for result,index in actual
					expect(result).to.equal(expected[index])
				done()
			logger.end()

	describe 'logging with colors', (describe,it) ->
		logger = new Logger(level:7)
		human = new Human()
		transform = new Browser()
		output = new PassThrough()
		actual = []
		expected =
			[ '["%c%s%c this is emergency and is level 0\\n    %c%s%c","color:red","emergency:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.550] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
			'["%c%s%c this is alert and is level 1\\n    %c%s%c","color:red","alert:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.551] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
			'["%c%s%c this is critical and is level 2\\n    %c%s%c","color:red","critical:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.551] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
			'["%c%s%c this is error and is level 3\\n    %c%s%c","color:red","error:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.552] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
			'["%c%s%c this is warning and is level 4\\n    %c%s%c","color:orange","warning:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.552] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
			'["%c%s%c this is notice and is level 5\\n    %c%s%c","color:orange","notice:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.553] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
			'["%c%s%c this is info and is level 6\\n    %c%s%c","color:green","info:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.553] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
			'["%c%s%c this is debug and is level 7\\n    %c%s%c","color:green","debug:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.554] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
			'["%c%s%c this is emerg and is level 0\\n    %c%s%c","color:red","emergency:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.554] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
			'["%c%s%c this is crit and is level 2\\n    %c%s%c","color:red","critical:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.555] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
			'["%c%s%c this is err and is level 3\\n    %c%s%c","color:red","error:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.555] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
			'["%c%s%c this is warn and is level 4\\n    %c%s%c","color:orange","warning:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.556] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
			'["%c%s%c this is note and is level 5\\n    %c%s%c","color:orange","notice:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.556] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
			'["%c%s%c this is default and is level 6\\n    %c%s%c","color:green","info:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.556] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]' ]

		# Clean up
		expected = expected.map(cleanChanging)

		output.on 'data', (chunk) ->
			actual.push chunk.toString()

		it 'should pipe correctly', ->
			logger.pipe(human).pipe(transform).pipe(output)
			transform.setConfig(write:false)

		it 'should log messages', ->
			for own name,code of Logger::config.levels
				message = "this is #{name} and is level #{code}"
				logger.log(name, message)

		it 'should provide the expected output', (done) ->
			output.on 'end', ->
				#console.log actual
				actual = actual.map(cleanChanging)
				expect(actual.length).to.equal(expected.length)
				for result,index in actual
					expect(result).to.equal(expected[index])
				done()
			logger.end()
