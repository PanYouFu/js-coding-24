"use strict";
function uncompress(str) {
    // your code here
    const reg = /(\d+)\(([a-zA-Z]+)\)/;
    let ans = str;
    // 存在 数字+括号+字母 的组合
    while (reg.test(ans)) {
        // helper 函数，将匹配的到字符串转成正常格式
        ans = helper(reg, ans);
    }
    console.log('uncompress---ans--', ans);
    return ans;
}
// const str = "2(BFE)3(dev)"
//  ['2(BFE)', '2', 'BFE']
function helper(reg, str) {
    const res = reg.exec(str);
    if (!res)
        return str;
    const [tagert, num, repeatStr] = res;
    return str.replace(reg, repeatStr.repeat(Number(num)));
}
console.log(uncompress('2(BFE)3(dev)'));
console.log(uncompress('3(ab2(c))'));
console.log(uncompress('3(ab)'));
// 使用栈
function uncompressByStack(str) {
    const stack = [];
    for (let i = 0; i < str.length; i++) {
        const cur = str[i];
        if (cur !== ')') {
            stack.push(cur);
        }
        else {
            // 匹配到第一个右侧括号了
            // 先找到 需要重复的 字符串
            let repeatStr = '';
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                const word = stack.pop();
                repeatStr = word + repeatStr;
            }
            stack.pop();
            // 再找要重复的次数
            let repeatCount = '';
            while (stack.length > 0 && isNumber(stack[stack.length - 1])) {
                const word = stack.pop();
                repeatCount = word + repeatCount;
            }
            const str = repeatStr.repeat(Number(repeatCount));
            for (let i = 0; i < str.length; i++) {
                stack.push(str[i]);
            }
        }
    }
    return stack.join('');
}
// 判断是否是个有效数字，首先得是数字，且非无限
function isNumber(str) {
    return !isNaN(Number(str)) && isFinite(Number(str));
}
console.log(uncompress('2(BFE)3(dev)'), uncompressByStack('2(BFE)3(dev)'));
console.log(uncompress('3(ab2(c))'), uncompressByStack('3(ab2(c))'));
console.log(uncompress('3(ab)'), uncompressByStack('3(ab)'));
//# sourceMappingURL=uncompress.js.map