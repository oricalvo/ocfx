export interface PackageJson {
    name: string;
    version: string;
    rootPath: string;
    dependencies: { [packageName: string]: string };
}
