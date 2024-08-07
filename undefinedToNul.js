/**
 * @param {any} arg
 * @returns {any}
 */
function undefinedToNull(arg) {
  if (arg === undefined) {
    return null;
  } else if (Array.isArray(arg)) {
    return arg.map((item) => undefinedToNull(item));
  } else if (Object.prototype.toString.call(arg) == "[object Object]") {
    const arr = Object.keys(arg);

    return arr.reduce((pre, cur) => {
      // 注意：[cur] key要写对哦
      return { ...pre, [cur]: undefinedToNull(arg[cur]) };
    }, {});
  } else return arg;
}

console.log(undefinedToNull({ a: undefined, b: "BFE.dev" }));
// {a: null, b: 'BFE.dev'}
// console.log(undefinedToNull({ a: ["BFE.dev", undefined, "bigfrontend.dev"] }));
// {a: ['BFE.dev', null, 'bigfrontend.dev']}
