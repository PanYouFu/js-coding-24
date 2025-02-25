// 示例 1：
// 输入：s = "abcdefg", k = 2
// 输出："bacdfeg"

// 示例 2：
// 输入：s = "abcd", k = 2
// 输出："bacd"
function reverseStr(s: string, k: number): string {
  const arr = s.split('')
  for (let i = 0; i < arr.length; i += 2 * k) {
    let left = i
    let right = i + k - 1 >= arr.length ? arr.length - 1 : i + k - 1
    while (left < right) {
      let temp = arr[right]
      arr[right] = arr[left]
      arr[left] = temp

      left++
      right--
    }
  }

  return arr.join('')
}

console.log('reverseStr', reverseStr('abcdefg', 2))
