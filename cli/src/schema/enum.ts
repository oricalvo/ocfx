import { CliArgReader } from "../reader.js";
import { CliArgMetadata, CliArgType } from "../models.js";

export function schemaEnum<T>(arg1: object | string, arg2?: object | T, arg3?: T): T {
    const args = Array.from(arguments);

    const { name, enumType, defValue } = (function () {
        if (args.length == 1) {
            return {
                name: undefined,
                enumType: <object>arg1,
                defValue: undefined,
            };
        } else if (args.length == 2) {
            if (typeof arg1 == "string") {
                return {
                    name: arg1,
                    enumType: arg2,
                    defValue: undefined,
                };
            } else {
                return {
                    name: undefined,
                    enumType: arg1,
                    defValue: arg2,
                };
            }
        } else {
            return {
                name: arg1,
                enumType: arg2,
                defValue: arg3,
            };
        }
    })();

    const metadata: CliArgMetadata = {
        type: CliArgType.Enum,
        handler: function (reader: CliArgReader) {
            return reader.readEnum(this.name, <object>enumType, { defValue });
        },
        name: <any>name,
        key: <any>undefined,
    };

    return <any>metadata;
}

export function parseEnum<T, K extends keyof T>(enumType: T, str: string): T[K] {
    const val = enumType[<K>str];
    if (val === undefined) {
        throw new Error("Invalid enum string: " + str);
    }

    return val;
}
