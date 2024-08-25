import { ILogger, LogLevel, LogLevelNumeric } from "./models.js";
import { DateTime } from "luxon";
import { parseEnum } from "@ocfx/common/dist/enum.helpers.js";

export class ConsoleLogger implements ILogger {
    private logLevel: LogLevelNumeric = LogLevelNumeric.info;
    private readonly PAD = 7;

    constructor() {
        //
        //  Under common project we cannot reference directly NodeJS assets so
        //  we need to work with the global NodeJS reference
        //
        if (typeof global !== "undefined") {
            const envVar = global.process.env["OC_LOGLEVEL"];
            const logLevel: LogLevel = (envVar && parseEnum(LogLevel, envVar)) || LogLevel.info;
            this.logLevel = LogLevelNumeric[logLevel] || LogLevelNumeric.info;
        }
    }

    error(message: string, error: Error) {
        this.inner(LogLevelNumeric.error, message, [error]);
    }

    warn(message: any, ...meta: any[]) {
        this.inner(LogLevelNumeric.warn, message, meta);
    }

    info(message: any, ...meta: any[]) {
        this.inner(LogLevelNumeric.info, message, meta);
    }

    debug(message: any, ...meta: any[]) {
        this.inner(LogLevelNumeric.debug, message, meta);
    }

    private inner(logLevel: LogLevelNumeric, message: any, meta: any[]) {
        if (this.logLevel < logLevel) {
            return;
        }

        const funcName = LogLevelNumeric[logLevel];
        const logLevelStr = `[${funcName.toUpperCase()}]`.padEnd(this.PAD);
        const timestamp = DateTime.now().toFormat("HH:mm:ss.SSS");

        console.log(timestamp, logLevelStr, message, ...meta);
    }
}
