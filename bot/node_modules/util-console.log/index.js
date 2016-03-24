/// <reference path='typings/node/node.d.ts' />
/// <reference path='typings/chalk/chalk.d.ts' />
/// <reference path='typings/moment/moment.d.ts' />
var util = require('util');
var chalk = require('chalk');
var moment = require('moment');
var fs = require('fs');
var log_levels_map = {
    all: ["debug", "log", "info", "warn", "error"],
    debug: ["debug", "log", "info", "warn", "error"],
    log: ["log", "info", "warn", "error"],
    info: ["info", "warn", "error"],
    warn: ["warn", "error"],
    error: ["error"]
};
var config = {
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
    formatter: timestamp
};
function timestamp() {
    return '[' + moment().format("YY-MM-DD HH:mm:ss.SSS") + '] %s';
}
function logprefix(fn) {
    Object.keys(config.theme).forEach(function (k) {
        var method = console[k] || console.log;
        console[k] = function () {
            var s = fn();
            if (config.inject_level) {
                arguments[0] = util.format("[%s] %s", k, arguments[0]);
            }
            if (config.to_file) {
                arguments[0] = util.format(s + '\n', arguments[0]);
                fs.appendFile(config.file_name, arguments[0], function (err) {
                    if (err)
                        throw err;
                });
            }
            else {
                arguments[0] = config.theme[k](arguments[0]);
                arguments[0] = util.format(s, arguments[0]);
                if (log_levels_map[config.log_level].indexOf(k) > -1) {
                    method.bind(console).apply(console, arguments);
                }
            }
        };
    });
}
function configure(conf) {
    // mix values
    if (typeof (conf) == "object") {
        if (typeof (conf.theme) == "object") {
            Object.keys(conf.theme).forEach(function (key) {
                if (typeof (conf.theme[key]) != "undefined") {
                    config.theme[key] = conf.theme[key];
                }
            });
        }
        if (typeof (conf.formatter) == "function") {
            config.formatter = conf.formatter;
        }
        if (typeof (conf.log_level) == "string") {
            config.log_level = conf.log_level;
        }
        if (typeof (conf.file_name) == "string") {
            config.file_name = conf.file_name;
        }
        if (typeof (conf.to_file) == "boolean") {
            config.to_file = conf.to_file;
        }
        if (typeof (conf.inject_level) == "boolean") {
            config.inject_level = conf.inject_level;
        }
    }
    logprefix(config.formatter);
}
exports.configure = configure;
