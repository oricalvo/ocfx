export enum LogLevel {
    none = "none",
    error = "error",
    warn = "warn",
    info = "info",
    debug = "debug",
}

export enum LogLevelNumeric {
    none = 0,
    error = 1,
    warn = 2,
    info = 3,
    debug = 4,
}

export interface ILogger {
    error(message: any, error?: Error): void;
    warn(message: any, ...meta: any[]): void;
    info(message: any, ...meta: any[]): void;
    debug(message: any, ...meta: any[]): void;
}

export interface LogJsonMethod {
    (obj: any): void;
    (message: string, obj: any): void;
}

export interface LogJson {
    (logger: ILogger, level: keyof ILogger, obj: any): void;
    (logger: ILogger, level: keyof ILogger, message: string, obj: any): void;
}
