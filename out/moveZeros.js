"use strict";
const moveZeros = (list) => {
    if (list.length < 2)
        return list;
    let leftZero = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i] === 0) {
            leftZero++;
        }
        else {
            if (leftZero > 0) {
                list[i - leftZero] = list[i];
                list[i] = 0;
            }
        }
    }
    return list;
};
const list = [1, 0, 0, 2, 3];
moveZeros(list);
console.log(list); // [1,2,3,0,0]
//# sourceMappingURL=moveZeros.js.map