import { expect, test } from "@jest/globals";
import { schemaBoolean, parseBoolean } from "./boolean.js";
import { read } from "../reader.js";
import { schemaString } from "./string.js";
import {Schema} from "./schame.js";

test("parseBoolean with true/false/empty", () => {
    expect(parseBoolean("true")).toEqual(true);
    expect(parseBoolean("false")).toEqual(false);
    expect(parseBoolean("")).toEqual(true);
});

test("--verbose", () => {
    const cli = read(
        {
            verbose: Schema.boolean(),
        },
        ["--verbose"],
    );

    expect(cli.verbose).toEqual(true);
});

test("--verbose --name ori", () => {
    const cli = read(
        {
            verbose: Schema.boolean(),
            name: Schema.string("name"),
        },
        ["--verbose", "--name", "Ori"],
    );

    expect(cli.verbose).toEqual(true);
    expect(cli.name).toEqual("Ori");
});
