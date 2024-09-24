"use strict";
function getIntersection(arr1, arr2) {
    const set2 = new Set(arr2);
    const len = arr1.length;
    const ans = [];
    for (let i = 0; i < len; i++) {
        if (set2.has(arr1[i])) {
            ans.push(arr1[i]);
            set2.delete(arr1[i]);
        }
    }
    return ans;
}
//# sourceMappingURL=2arrays.js.map