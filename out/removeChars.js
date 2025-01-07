"use strict";
// Given a string contaning only a, b and c, remove all b and ac.
function removeChars(str) {
    let ans = str;
    while (ans.includes('b') || ans.includes('ac')) {
        ans = helper1(ans);
    }
    return ans;
}
function helper1(str) {
    return str.replace(/b/g, '').replace(/ac/g, '');
}
removeChars('ab'); // 'a'
removeChars('abc'); // ''
removeChars('cabbaabcca'); // 'caa'
console.log(removeChars('ab'), removeChars('abc'), removeChars('cabbaabcca'));
//# sourceMappingURL=removeChars.js.map