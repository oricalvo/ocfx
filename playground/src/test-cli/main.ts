import {Schema, read} from "@ocfx/cli";

const cli = read({
    name: Schema.string(),
});

console.log("Hello " + cli.name);
