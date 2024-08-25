import { expect, test } from "@jest/globals";
import { read } from "../reader.js";
import { schemaNumberArray, parseNumber, parseNumberArray } from "./number.js";
import {Schema} from "./schame.js";

test("parseNumber with simple number", () => {
    expect(parseNumber("123")).toEqual(123);
});

test("parseNumber throws", () => {
    expect(() => parseNumber("123xx")).toThrow();
});

test("parseNumberArray with 1,2,3", () => {
    expect(parseNumberArray("1,2,3")).toStrictEqual([1, 2, 3]);
});

test("parseNumberArray throws on xxx", () => {
    expect(() => parseNumberArray("xxx")).toThrow();
});

test("parseNumberArray throws 1,a,2", () => {
    expect(() => parseNumberArray("1,a,2")).toThrow();
});

test("parseNumberArray with non default separator", () => {
    expect(parseNumberArray("1 0 2", " ")).toStrictEqual([1, 0, 2]);
});

test("--num 1", () => {
    const cli = read(
        {
            num: Schema.number(),
        },
        ["--num", "1"],
    );

    expect(cli.num).toStrictEqual(1);
});

test("Schema.number with default", () => {
    const cli = read(
        {
            num: Schema.number(1),
        },
        [],
    );

    expect(cli.num).toStrictEqual(1);
});

test("--num with no value throws", () => {
    expect(()=> {
        read(
            {
                num: Schema.number(),
            },
            ["--num"],
        );
    }).toThrow();
});

test("--nums 1,2,3", () => {
    const cli = read(
        {
            nums: Schema.numberArray(),
        },
        ["--nums", "1,2,3"],
    );

    expect(cli.nums).toStrictEqual([1, 2, 3]);
});

test("CliArgArrayNumber with default", () => {
    const cli = read(
        {
            nums: Schema.numberArray("nums", [1, 2, 3]),
        },
        [],
    );

    expect(cli.nums).toStrictEqual([1, 2, 3]);
});
