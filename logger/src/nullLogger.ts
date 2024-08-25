import { ILogger } from "./models.js";

export class NullLogger implements ILogger {
    error(message: any, error: Error): void {}
    warn(message: any, ...meta: any[]): void {}
    info(message: any, ...meta: any[]): void {}
    debug(message: any, ...meta: any[]): void {}
}
