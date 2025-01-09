// function cloneDeep(data: any): any {
//   let res: any
//   const baseType = [
//     'String',
//     'Boolean',
//     'Undefined',
//     'Number',
//     'Symbol',
//     'Null',
//     'Bigint',
//   ]
//   const type = Object.prototype.toString
//     .call(data)
//     .slice(8, Object.prototype.toString.call(data).length - 1)

//   console.log('type:', type)
//   // 基本类型
//   if (baseType.indexOf(type) > -1) {
//     res = data
//   } else {
//     // 数组
//     if (Array.isArray(data)) {
//       res = data.map((item) => cloneDeep(item))
//     }
//     // 函数
//     if (type === 'Function') {
//       res = data
//     }
//     // 对象
//     if (type === 'Object') {
//       const keys = Object.keys(data)
//       res = {}
//       keys.forEach((key) => {
//         console.log('key, data[key]', key, data[key])
//         res[key] = cloneDeep(data[key])
//       })
//     }
//   }

//   return res
// }

// console.log(cloneDeep(3))
// console.log(cloneDeep({ a: { b: { c: 3 }, d: 4 } }))

function cloneDeep(data: any, map: Map<any, any> = new Map()): any {
  const type = typeof data
  // 基本类型
  if (type === null || type !== 'object') {
    return data
  }
  // 解决循环引用
  // 以data为键；来确认这个值之前是否copy过
  // 如果拷贝过；则不需要再反复递归了；直接取map中的值
  if (map.has(data)) {
    return map.get(data)
  }

  // const output: any = Array.isArray(data) ? [] : {}
  // map.set(data, output)
  // // 复杂类型
  // const keys = [...Object.keys(data), ...Object.getOwnPropertySymbols(data)]
  // for (const key of keys) {
  //   output[key] = cloneDeep(data[key], map)
  // }

  // return output

  let res: any
  if (Array.isArray(data)) {
    res = []
    map.set(data, res)
    data.forEach((item) => res.push(cloneDeep(item, map)))
  } else {
    res = {}
    map.set(data, res)
    const keys = [...Object.keys(data), ...Object.getOwnPropertySymbols(data)]
    for (const key of keys) {
      res[key] = cloneDeep(data[key], map)
    }
  }
  return res
}

const obj = [1, [2, 3], { a: { b: { c: 3 }, d: 4 } }]
const clone = cloneDeep(obj)
console.log('clone:', clone)
