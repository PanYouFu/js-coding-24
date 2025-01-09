"use strict";
/**
 * 更新复杂类型
 */
function update(data, command) {
    const arr = Object.entries(command);
    let res;
    arr.forEach((item) => {
        const [key, value] = item;
        switch (key) {
            case '$push':
                if (isArray(data)) {
                    res = [...data, ...value];
                }
                else {
                    throw new Error('not array');
                }
                break;
            case '$set':
                res = value;
                break;
            case '$apply':
                res = value(data);
                break;
            case '$merge':
                if (isObj(data)) {
                    res = Object.assign(Object.assign({}, data), value);
                }
                else {
                    throw new Error('not object');
                }
                break;
            default:
                if (isArray(data)) {
                    const ans = [...data];
                    ans[Number(key)] = update(ans[Number(key)], value);
                    res = ans;
                }
                else {
                    res = Object.assign(Object.assign({}, data), { [key]: update(data[key], value) });
                }
                break;
        }
    });
    return res;
}
function isArray(data) {
    return data instanceof Array;
}
function isObj(data) {
    const typeStr = Object.prototype.toString.call(data);
    return typeStr.slice(8, typeStr.length - 1) === 'Object';
}
// -----------------test--------------
// const arr = [1, 2, 3, 4]
// const newArr = update(arr, {$push: [5, 6]})
// const state = {
//   a: {
//     b: {
//       c: 1,
//     },
//   },
//   d: 2,
// }
// const newState = update(state, { a: { b: { c: { $set: 3 } } } })
// const arr = [1, 2, 3, 4]
// const newArr = update(arr, { 0: { $set: 0 } })
// const state = {
//   a: {
//     b: {
//       c: 1,
//     },
//   },
//   d: 2,
// }
// const newState = update(state, { a: { b: { $merge: { e: 5 } } } })
// const arr = [1, 2, 3, 4]
// const newArr = update(arr, { 0: { $apply: (item: number) => item * 2 } })
//# sourceMappingURL=update.js.map