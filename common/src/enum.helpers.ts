export function parseEnum<T, K extends keyof T>(enumType: T, str: string): T[K] {
    const val = enumType[<K>str];
    if (val === undefined) {
        throw new Error("Invalid enum string " + str);
    }

    return val;
}

export function tryParseEnum<T, K extends keyof T>(enumType: T, str: string): T[K] | null {
    const val = enumType[<K>str];
    if (val === undefined) {
        return null;
    }

    return val;
}
