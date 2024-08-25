import { repeat } from "@ocfx/common/dist/array.helpers.js";
import _ from "lodash";
import { DateTime } from "luxon";
import { ILogger, LogJson, LogJsonMethod, LogLevel, LogLevelNumeric } from "./models.js";
import { ModuleLogger } from "./moduleLogger.js";
import { GlobalLogger } from "./globalLogger.js";

function _logJson(logger: ILogger, level: keyof ILogger, arg1: string, arg2: any, pretty: boolean) {
    const obj = arg2 == undefined ? arg1 : arg2;
    const message = arg2 == undefined ? undefined : arg1;
    const json = (message ? message + " " : "") + (pretty ? JSON.stringify(obj, undefined, 2) : JSON.stringify(obj));

    logger[level](json);
}

const SENSITIVE_FIELDS = ["password", "secret"];

function _logConfig(logger: ILogger, level: keyof ILogger, arg1: string, arg2: any, pretty: boolean) {
    //
    //  Clone obj and remove sensitive keys
    //
    const obj = _.cloneDeep(arg2 == undefined ? arg1 : arg2);
    for (const key in obj) {
        for (const sensitive of SENSITIVE_FIELDS) {
            if (key.toLowerCase().includes(sensitive)) {
                delete obj[key];
                break;
            }
        }
    }

    const message = arg2 == undefined ? undefined : arg1;
    const json = (message ? message + " " : "") + (pretty ? JSON.stringify(obj, undefined, 2) : JSON.stringify(obj));

    logger[level](json);
}

export const logJson: LogJson = (logger: ILogger, level: keyof ILogger, arg1: any, arg2?: any) => {
    _logJson(logger, level, arg1, arg2, true);
};

export const logJsonLine: LogJson = (logger: ILogger, level: keyof ILogger, arg1: any, arg2?: any) => {
    _logJson(logger, level, arg1, arg2, false);
};

//
//  Log obj as json but removed sensitive fields such as password and secret
//
export const logConfig: LogJson = (logger: ILogger, level: keyof ILogger, arg1: any, arg2?: any) => {
    _logConfig(logger, level, arg1, arg2, true);
};

export function createLogger(moduleName?: string, logger?: ILogger): ModuleLogger {
    return new ModuleLogger(moduleName, logger);
}

export const globalLogger = new GlobalLogger();

declare var global: any;
