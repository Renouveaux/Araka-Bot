# util-console.log

A configurable, light console.log enhancer using: chalk, moment, util, packed as npm module

## Installation

**npm**: `npm install util-console.log`

## Usage

Use `console.log()`, `console.debug()`, `console.error()` or whatever you previously used to generate your log messages. 

### Examples

TypeScript
```js
import utilconsole = require('util-console.log');
utilconsole.configure({ inject_level: true });
console.error("This is an error");
```

JavaScript / ECMAScript
```js
var utilconsole = require('util-console.log');
utilconsole.configure({ inject_level: true });
console.error("This is an error");
```

Output: `[15-06-09 10:25:11.388] [error] This is an error`

### Settings

You can change some optional preferences by passing an object via `configure()` interface. The defaults are shown below.

```js
config = {
	theme: {
		debug: chalk.grey,
		log: chalk.bold.grey,
		info: chalk.green,
		warn: chalk.bold.yellow,
		error: chalk.red
	},
	log_level: "all",
	to_file: false,
	file_name: "application.log",
	inject_level: false,
	formatter: function () {
		return '[' + moment().format("YY-MM-DD HH:mm:ss.SSS") + '] %s';
	}
};
```

- `theme` (Object)
    + Use chalk objects to rewrite the colors of your messages
- `log_level` (String)
    + Use error to supress all logs except error, or use any other to allow more types
- `to_file` (Boolean)
    + Set this to true to send all data to a file instead of the console
- `file_name` (String)
    + Change the name of the file you want data to be sent to
- `inject_level` (Boolean)
    + Set to true if you want to inject the severity level in your log entry. console.warn('messages') will output '[warn] message'
- `formatter` (Function)
    + Add a function to change the message format. By default a moment timestamp is added in front. Please note that this is applied after inject_level.

### Notes

This module was writted in TypeScript and then compiled. On GitHub you can find all sources, including the typescript file. 

### Credits

I have to mention [log-prefix](https://www.npmjs.com/package/log-prefix) and [log-timestamp](https://www.npmjs.com/package/log-timestamp) for inspiration on gettings this module done. Unfortunately I could not relay on any of them to be able to create this lightweight and integrated as I wanted. 