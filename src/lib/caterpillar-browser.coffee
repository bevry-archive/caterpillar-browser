# Browser
class Browser extends require('caterpillar').Transform
	config:
		color: true
		write: true
		styles:
			red:
				start: 31
				end: 39
				value: 'color:red'
			yellow:
				start: 33
				end: 39
				value: 'color:orange'
			green:
				start: 32
				end: 39
				value: 'color:green'
			bright:
				start: 1
				end: 22
				value: 'font-weight:bold'
			dim:
				start: 2
				end: 22
				value: 'color:lightGray'
			italic:
				start: 3
				end: 23
				value: 'font-style:italic'
			underline:
				start: 4
				end: 24
				value: 'text-decoration:underline'

	_transform: (chunk, encoding, next) =>
		# Check
		entry = chunk.toString()
		if entry[0] is '{'
			err = new Error("Input to the browser transform was not human readable")

		# Format
		else
			try
				args = @format(entry)
				console.log.apply(console, args)  if @getConfig().write is true
				message = JSON.stringify(args)
			catch _err
				err = err

		# Forward
		return next(err, message)

	format: (entry) =>
		# Prepare
		config = @getConfig()

		# Replace human formatted entry
		args = []
		result = entry.replace /\u001b\[([0-9]+)m(.+?)\u001b\[([0-9]+)m/g, (match,start,message,end) ->
			# Check
			return message  if config.color is false

			# Prepare
			matchedStyle = null

			# Find the matcing style for this combination
			for key,style of config.styles
				if String(style.start) is String(start) and String(style.end) is String(end)
					matchedStyle = style
					break

			# Check
			return message  unless matchedStyle

			# Push the style
			args.push(style.value)
			args.push(message)
			args.push('color:default; font:default; text-decoration:default')
			return '%c%s%c'

		# Return
		return [result.trim()].concat(args)

# Export
module.exports = {
	Browser
}