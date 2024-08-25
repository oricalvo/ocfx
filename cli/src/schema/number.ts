import { CliArgReader } from "../reader.js";
import { parseStringArray } from "./string.js";
import { CliArgMetadata, CliArgType } from "../models.js";
import {MissingCLIArgError} from "../errors.js";

export function schemaNumber(arg1?: string|number, arg2?: number): number {
    const [name, defValue] = (()=> {
        if (arguments.length == 0) {
            return [];
        }

        if(arguments.length == 1) {
            return [undefined, <number>arg1];
        }

        return [<string>arg1, <number>arg2];
    })();

    const metadata: CliArgMetadata = {
        type: CliArgType.Number,
        handler: function (reader: CliArgReader, value: string) {
            return reader.readNumber(this.name, { defValue });
        },
        name: <any>name,
        key: <any>undefined,
    };

    return <any>metadata;
}

export function schemaNumberArray(name?: string, defValue?: number[]): number[] {
    const hasDefValue = arguments.length == 2;

    const metadata: CliArgMetadata = {
        type: CliArgType.NumberArray,
        handler: function (reader: CliArgReader): any {
            if (hasDefValue) {
                return reader.readNumberArray(this.name, { defValue });
            }

            return reader.readNumberArray(this.name, {});
        },
        name: <any>name,
        key: <any>undefined,
    };

    return <any>metadata;
}

export function parseNumber(str: string): number {
    if(!str) {
        throw new Error("Number string cannot be empty");
    }

    const num = +str;

    if (isNaN(num)) {
        throw new Error("Invalid number string: " + str);
    }

    return num;
}

export function parseInteger(str: string): number {
    const num = parseInt(str, 10);

    if (isNaN(num)) {
        throw new Error("Invalid integer string: " + str);
    }

    return num;
}

export function parseNumberArray(str: string, separator?: string): number[] {
    const arr = parseStringArray(str, separator);

    return arr.map(n => parseNumber(n));
}
