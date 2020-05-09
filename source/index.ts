// Imports
import { Transform, LogEntry } from 'caterpillar'

/**
 * Convert human readable Caterpillar entries into browser compatible entries
 * @example
 * ``` javascript
 * import Logger from 'caterpillar'
 * import Human from 'caterpillar-human'
 * import Browser from 'caterpillar-browser'
 * const logger = new Logger()
 * const human = new Human()
 * const browser = new Browser()
 * logger.pipe(human).pipe(browser)
 * logger.log('info', 'some', {data: 'oh yeah'}, 42)
 * ```
 */
class Browser extends Transform {
	/** Get the initial configuration */
	getInitialConfig() {
		return {
			color: true,
			write: true,
			styles: {
				red: {
					start: 31,
					end: 39,
					value: 'color:red',
				},
				yellow: {
					start: 33,
					end: 39,
					value: 'color:orange',
				},
				green: {
					start: 32,
					end: 39,
					value: 'color:green',
				},
				bright: {
					start: 1,
					end: 22,
					value: 'font-weight:bold',
				},
				dim: {
					start: 2,
					end: 22,
					value: 'color:lightGray',
				},
				italic: {
					start: 3,
					end: 23,
					value: 'font-style:italic',
				},
				underline: {
					start: 4,
					end: 24,
					value: 'text-decoration:underline',
				},
			},
		}
	}

	/**
	 * Convert a human readable Caterpillar entry into a format that browser consoles can understand.
	 * And if the `write` config property is `true` (it is by default), write the result to the browser console.
	 */
	format(message: string): string[] {
		// Prepare
		const { color, styles, write } = this.getConfig()

		// Replace caterpillar-human formatted entry
		/* eslint no-control-regex:0 */
		const args: string[] = []
		const result = message.replace(
			/\u001b\[([0-9]+)m(.+?)\u001b\[([0-9]+)m/g,
			function (match, start, content, end) {
				// Check
				if (color === false) return content

				// Prepare
				let matchedStyle, style

				// Find the matcing style for this combination
				for (const key in styles) {
					if (styles.hasOwnProperty(key)) {
						style = styles[key]
						if (
							String(style.start) === String(start) &&
							String(style.end) === String(end)
						) {
							matchedStyle = style
							break
						}
					}
				}

				// Check
				if (!matchedStyle) return content

				// Push the style
				args.push(style.value)
				args.push(content)
				args.push('color:default; font:default; text-decoration:default')
				return '%c%s%c'
			}
		)

		// Final format
		const parts = [result.trim()].concat(args)

		// Write
		/* eslint no-console:0 */
		if (write) console.log(...parts)

		// Return
		return parts
	}
}

// Aliases
export const create = Browser.create.bind(Browser)
export default Browser
