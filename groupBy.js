"use strict";
function ObjectGroupBy(items, callback) {
    var res = {};
    items.forEach(function (item) {
        var key = callback(item);
        if (res[key]) {
            res[key].push(item);
        }
        else {
            res[key] = [item];
        }
    });
    return res;
}
// 收到的参数是一个数组，和一个回调。会对这个数组的每一项进行回调操作。最终返回的是一个对象，key为回调函数的返回值
// 举例
var inventory = [
    { name: "芦笋", type: "蔬菜", quantity: 5 },
    { name: "香蕉", type: "水果", quantity: 0 },
    { name: "山羊", type: "肉", quantity: 23 },
    { name: "樱桃", type: "水果", quantity: 5 },
    { name: "鱼", type: "肉", quantity: 22 },
];
var result = ObjectGroupBy(inventory, function (_a) {
    var type = _a.type;
    return type;
});
console.log("result----", result);
/* 结果是：
{
  蔬菜: [
    { name: "芦笋", type: "蔬菜", quantity: 5 },
  ],
  水果: [
    { name: "香蕉", type: "水果", quantity: 0 },
    { name: "樱桃", type: "水果", quantity: 5 }
  ],
  肉: [
    { name: "山羊", type: "肉", quantity: 23 },
    { name: "鱼", type: "肉", quantity: 22 }
  ]
}
*/
//# sourceMappingURL=groupBy.js.map