import {Schema, read} from "@ocfx/cli";

const cli = read({
    name: Schema.string(), // Parameter --name is required
    id: Schema.number(), // Parameter --id is required (must be a number)
    verbose: Schema.boolean("v", false), // Parameter --v is optional
    emails: Schema.stringArray("email") // Parameter --email is a list of strings. For example, "abc cde efg"
});

console.log("Name: " + cli.name);
console.log("ID: " + cli.id);
console.log("Verbose: " + cli.verbose);
console.log("Emails: " + cli.emails);

// Run with
// node dist/main2.js --name Roni --id 1 --email "oc1@gmail.com oc2@gmail.com"
