function clz32(num) {
    // your code here
    // 限制数值范围：将数值限制在 0 到 4294967295 之间，确保其为非负整数。
    num = num >>> 0;
    if (num === 0)
        return 32;
    const count = Math.log2(num);
    return 32 - count - 1;
}
//# sourceMappingURL=clz32.js.map