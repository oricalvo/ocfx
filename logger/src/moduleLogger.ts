import { ILogger, LogJsonMethod } from "./models.js";
import { globalLogger, logConfig, logJson, logJsonLine } from "./logger.js";

export class ModuleLogger implements ILogger {
    private _moduleName: string|undefined;
    private _parent: ILogger;

    constructor(moduleName?: string, parent?: ILogger) {
        this._parent = parent || globalLogger;
        this._moduleName = moduleName;
    }

    error(message: string, error?: Error): void {
        this._parent.error(this.prependModuleName(message), error);
    }

    warn(message: string, ...meta: any[]): void {
        this._parent.warn(this.prependModuleName(message), ...meta);
    }

    info(message: string, ...meta: any[]): void {
        this._parent.info(this.prependModuleName(message), ...meta);
    }

    debug(message: string, ...meta: any[]): void {
        this._parent.debug(this.prependModuleName(message), ...meta);
    }

    errorJson: LogJsonMethod = <any>logJson.bind(undefined, this, "error");
    warnJson: LogJsonMethod = <any>logJson.bind(undefined, this, "warn");
    infoJson: LogJsonMethod = <any>logJson.bind(undefined, this, "info");
    debugJson: LogJsonMethod = <any>logJson.bind(undefined, this, "debug");

    infoConfig: LogJsonMethod = <any>logConfig.bind(undefined, this, "info");
    debugConfig: LogJsonMethod = <any>logConfig.bind(undefined, this, "debug");

    errorJsonLine: LogJsonMethod = <any>logJsonLine.bind(undefined, this, "error");
    warnJsonLine: LogJsonMethod = <any>logJsonLine.bind(undefined, this, "warn");
    infoJsonLine: LogJsonMethod = <any>logJsonLine.bind(undefined, this, "info");
    debugJsonLine: LogJsonMethod = <any>logJsonLine.bind(undefined, this, "debug");

    private prependModuleName(message: string): string {
        if (this._moduleName) {
            return `[${this._moduleName}] ` + message;
        }

        return message;
    }
}
