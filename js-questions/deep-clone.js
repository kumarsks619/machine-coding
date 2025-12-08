const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    const copy = Array.isArray(obj) ? [...obj] : { ...obj };
    for (let key in copy) {
        copy[key] = deepClone(copy[key]);
    }
    return copy;
};

const nestedObj = { a: 'Hello', b: { c: 'World', d: { e: '!' } } };
const shallowCopied = { ...nestedObj };
const deepCopied = deepClone(nestedObj);
const jsonStringifyCopy = JSON.parse(JSON.stringify(nestedObj));
nestedObj.b.d = null; // updated the actual object
console.log('nestedObj: ', nestedObj); // actual object should be updated
console.log('shallowCopied: ', shallowCopied); // shallow copy should also get updated
console.log('deepCopied: ', deepCopied); // deep copy should remain unaffected
console.log('jsonStringifyCopy: ', jsonStringifyCopy); // this is also a deep copy, should remain unaffected

// JSON.parse(JSON.stringy(nestedObj)) is a HACK and shouldn't always be used.
// It fails for functions, undefined, circular references, special types like Date, Map, Set, and converts NaN / Infinity into null.
