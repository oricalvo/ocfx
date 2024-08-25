import { createLogger } from "@ocfx/logger";
import { readJsonFile, writeJsonFile } from "@ocfx/server-common/dist/file.helpers.js";
import { PackageJson } from "./models.js";
import semver from "semver";

const logger = createLogger();

export async function incVersion(packageJsonFilePath: string): Promise<string> {
    logger.debug("incVersion", packageJsonFilePath);

    const packageJson = await readJsonFile<PackageJson>(packageJsonFilePath);

    const newVersion = semver.inc(packageJson.version, "patch")!;
    packageJson.version = newVersion;
    await writeJsonFile(packageJsonFilePath, packageJson, 4);

    return newVersion;
}
