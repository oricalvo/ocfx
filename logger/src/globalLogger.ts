import { ILogger } from "./models.js";
import { ConsoleLogger } from "./consoleLogger.js";

export class GlobalLogger implements ILogger {
    public instance: ILogger = new ConsoleLogger();

    error(message: any, error: Error) {
        this.instance?.error(message, error);
    }

    warn(message: any, ...meta: any[]) {
        this.instance?.warn(message, ...meta);
    }

    info(message: any, ...meta: any[]) {
        this.instance?.info(message, ...meta);
    }

    debug(message: any, ...meta: any[]) {
        this.instance?.debug(message, ...meta);
    }
}
