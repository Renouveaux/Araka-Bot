/// <reference path="chalk.d.ts" />
var chalk = require('chalk');
var str;
var bool;
chalk.enabled = bool;
str = chalk.stripColor(str);
bool = chalk.supportsColor;
bool = chalk.hasColor(str);
console.log(chalk.blue('Hello world!'));
console.log(chalk.blue('Hello'), 'World' + chalk.red('!'));
console.log(chalk.blue.bgRed.bold('Hello world!'));
console.log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));
console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));
console.log(chalk.green('I am a green line ' + chalk.blue('with a blue substring') + ' that becomes green again!'));
//# sourceMappingURL=chalk-tests.js.map