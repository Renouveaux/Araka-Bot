/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/chalk/chalk.d.ts" />
/// <reference path="typings/moment/moment.d.ts" />
export interface Config {
    theme?: {
        debug?: any;
        log: any;
        info?: any;
        warn?: any;
        error?: any;
    };
    file_name?: string;
    to_file?: boolean;
    inject_level?: boolean;
    formatter?(): string;
    log_level?: string;
}
export declare function configure(conf?: Config): void;
