import { expect, test } from "@jest/globals";
import { read } from "../reader.js";
import { schemaString } from "./string.js";

test("--name Ori", () => {
    const cli = read(
        {
            name: schemaString(),
        },
        ["--name", "Ori"],
    );

    expect(cli.name).toStrictEqual("Ori");
});

test("String with default", () => {
    const cli = read(
        {
            name: schemaString("Roni"),
        },
        [],
    );

    expect(cli.name).toStrictEqual("Roni");
});
