// 输入: s = "abab"
// 输出: true
// 解释: 可由子串 "ab" 重复两次构成。

// 输入: s = "abcabcabcabc"
// 输出: true
// 解释: 可由子串 "abc" 重复四次构成。 (或子串 "abcabc" 重复两次构成。)

function repeatedSubstringPattern(s: string): boolean {
  const str = s + s
  return str.slice(1).includes(s)
}
