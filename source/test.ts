// Import
import { equal } from 'assert-helpers'
import { suite } from 'kava'
import { Logger } from 'caterpillar'
import Human from 'caterpillar-human'
import { PassThrough } from 'stream'
import Browser from './index.js'

// Prepare
function cleanChanging(item: string): string {
	item = item
		.replace(/\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}\]/, 'date')
		.replace(/\[[/\\].+?:\d{1,}\]/, 'file')
		.replace(/\[[^\]]+?\]/, 'method')
	return item
}

// Test
suite('human', function (suite) {
	suite('instantiation', function (suite, test) {
		test('should instantiate correctly', function () {
			const browser = new Browser()
			equal(
				browser.getConfig().color,
				true,
				'default color was applied correctly'
			)
		})

		test('should instantiate correctly, via create, with config', function () {
			const browser = Browser.create({ color: false })
			equal(
				browser.getConfig().color,
				false,
				'custom color was applied correctly'
			)
		})
	})

	function addSuite(
		name: string,
		config: { color?: boolean; level?: number },
		expected: string[],
		cleaner?: typeof cleanChanging
	) {
		suite(name, function (suite, test) {
			const logger = new Logger(config)
			const human = new Human()
			const browser = new Browser()
			const output = new PassThrough()
			let actual: string[] = []
			if (cleaner) expected = expected.map(cleaner)

			output.on('data', function (chunk) {
				actual.push(chunk.toString())
			})

			test('should pipe correctly', function () {
				logger.pipe(human).pipe(browser).pipe(output)
			})

			test('should log messages', function () {
				const levels = logger.getConfig().levels
				Object.keys(levels).forEach(function (name) {
					const code = levels[name]
					const message = `this is ${name} and is level ${code}`
					logger.log(name, message)
				})
			})

			test('should provide the expected output', function (done) {
				output.on('end', function () {
					if (cleaner) actual = actual.map(cleaner)
					equal(actual.length, expected.length)
					actual.forEach(function (result, index) {
						equal(result, expected[index])
					})
					done()
				})
				logger.end()
			})
		})
	}

	addSuite(
		'logging without colors in debug mode',
		{ color: false, level: 7 },
		[
			'["emergency: this is emergency and is level 0\\n    → [2013-05-06 20:41:13.973] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
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
			'["info: this is default and is level 6\\n    → [2013-05-06 20:41:13.984] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:61] [Task.fn]"]',
		],
		cleanChanging
	)

	addSuite(
		'logging with colors in debug mode',
		{ level: 7 },
		[
			'["%c%s%c this is emergency and is level 0\\n    %c%s%c","color:red","emergency:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.550] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
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
			'["%c%s%c this is default and is level 6\\n    %c%s%c","color:green","info:","color:default; font:default; text-decoration:default","color:lightGray","→ [2013-05-06 21:17:14.556] [/Users/balupton/Projects/caterpillar-browser/out/test/caterpillar-browser-test.js:110] [Task.fn]","color:default; font:default; text-decoration:default"]',
		],
		cleanChanging
	)
})
