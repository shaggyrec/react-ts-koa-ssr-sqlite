export const omitNullAndUndefinedValues = (object: object): object => {
    return Object.keys(object).filter((x: string): boolean => [null, undefined].indexOf(object[x]) === -1)
        .reduce((acc: object, x: string): object => ({ ...acc, [x]: object[x] }), {});
};
