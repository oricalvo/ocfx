import {schemaDate} from "./date.js";
import {schemaBoolean} from "./boolean.js";
import {schemaEnum} from "./enum.js";
import {schemaString, schemaStringArray} from "./string.js";
import {schemaNumber, schemaNumberArray} from "./number.js";
import { schemaCmd, schemaCmdArgv } from "./cmd.js";

export class Schema {
    private constructor() {}

    static string(): string;
    static string(defValue: string): string;
    static string(name: string, defValue: string): string;
    static string(arg1?: string, arg2?: string): string {
        return schemaString.apply(undefined, <any>arguments);
    }

    static number(): number;
    static number(defValue: number): number;
    static number(name: string, defValue: number): number;
    static number(arg1?: string|number, arg2?: number): number {
        return schemaNumber.apply(undefined, <any>arguments);
    }

    static boolean(): boolean;
    static boolean(name: string): boolean;
    static boolean(defValue: boolean): boolean;
    static boolean(name: string, defValue: boolean): boolean;
    static boolean(arg1?: string | boolean, arg2?: boolean): boolean {
        return schemaBoolean.apply(undefined, <any>arguments);
    }

    static date(): Date;
    static date(name: string): Date;
    static date(name: string, defValue: Date): Date;
    static date(arg1?: string, arg2?: Date): Date {
        return schemaDate.apply(undefined, <any>arguments);
    }

    static enum<T>(enumType: object): T;
    static enum<T>(name: string, enumType: object): T;
    static enum<T>(enumType: object, defValue: T): T;
    static enum<T>(name: string, enumType: object, defValue: T): T;
    static enum<T>(arg1: object | string, arg2?: object | T, arg3?: T): T {
        return <T>schemaEnum.apply(undefined, <any>arguments);
    }

    static stringArray(): string[];
    static stringArray(name: string): string[];
    static stringArray(name: string, defValue: string[]): string[];
    static stringArray(name: string, defValue: string[], separator: string): string[]
    static stringArray(arg1?: string, arg2?: string[], arg3?: string) {
        return schemaStringArray.apply(undefined, <any>arguments);
    }

    static numberArray(): number[];
    static numberArray(name: string): number[];
    static numberArray(name: string, defValue: number[]): number[];
    static numberArray(arg1?: string, arg2?: number[]): number[] {
        return schemaNumberArray.apply(undefined, <any>arguments);
    }

    static cmd(): string {
        return schemaCmd();
    }

    static cmdArgv(): string[] {
        return schemaCmdArgv();
    }
}
