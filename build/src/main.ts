import { read, Schema } from "@ocfx/cli";
import { createLogger } from "@ocfx/logger";
import sourceMap from "source-map-support";
import { incVersion } from "@ocfx/workspace/dist/index.js";
import path from "node:path";

const logger = createLogger();

async function main() {
    sourceMap.install();

    const { cmd, argv } = read({
        cmd: Schema.cmd(),
        argv: Schema.cmdArgv(),
    });

    if (cmd == "publish") {
        await publish(argv);
    } else {
        throw new Error("Unexpected command: " + cmd);
    }
}

async function publish(argv: string[]) {
    logger.info("Publishing");

    const packageJsonFilePath = path.resolve(process.cwd(), "package.json");
    await incVersion(packageJsonFilePath);
}

main();
