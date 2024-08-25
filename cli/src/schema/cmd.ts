import { CliArgMetadata, CliArgType } from "../models.js";
import { CliArgReader } from "../reader.js";

export function schemaCmd(): string {
    const metadata: CliArgMetadata = {
        type: CliArgType.Cmd,
        name: <any>undefined,
        key: <any>undefined,
        handler: (reader: CliArgReader, value: any): string => {
            return value;
        },
    };

    return <any>metadata;
}

export function schemaCmdArgv(required: boolean = false): string[] {
    const metadata: CliArgMetadata = {
        type: CliArgType.CmdArgv,
        name: <any>undefined,
        key: <any>undefined,
        handler: (reader: CliArgReader, value: any): string => {
            return value;
        },
        required,
    };

    return <any>metadata;
}
