## Description

Type safe parsing of CLI parameters
As opposed to other CLI parsers, @ocfx/cli returns type safe parameters and therefore allow for
better compilation and intellisense
@ocfx/cli is not a framework for managing the whole CLI application lifecycle,
instead it focuses on parsing argv in a type safe manner

## Installation

Stable version:

```bash
npm install @ocfx/cli
```

## Simple Example

```typescript
import { Schema, read } from "@ocfx/cli";

const cli = read({
    name: Schema.string(),
});

console.log("Hello " + cli.name);
```

```bash
$ ./main.js --name World
Hello World
```

## Complex Example

```typescript
import { Schema, read } from "@ocfx/cli";

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
```

```bash
$ ./main.js --name Roni --id 1 --email "oc1@gmail.com oc2@gmail.com"
Name: Roni
ID: 1
Verbose: true
Emails: oc1@gmail.com,oc2@gmail.com
```
