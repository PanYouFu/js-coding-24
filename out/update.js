"use strict";
/**
 * 更新复杂类型
 */
function update(data, command) {
    const arr = Object.entries(command);
    console.log('arr:', arr);
    arr.forEach((item) => {
        console.log('item:', item);
    });
    return data;
}
function isArray(data) {
    return data instanceof Array;
}
function isObj(data) {
    const typeStr = Object.prototype.toString.call(data);
    return typeStr.slice(8, typeStr.length - 1) === 'Object';
}
// const arr = [1, 2, 3, 4]
// const newArr = update(arr, {$push: [5, 6]})
const state = {
    a: {
        b: {
            c: 1,
        },
    },
    d: 2,
};
const newState = update(state, { a: { b: { c: { $set: 3 } } } });
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