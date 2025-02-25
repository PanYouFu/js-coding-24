// 输入：s = "the sky is blue"
// 输出："blue is sky the"
function reverseWords(s: string): string {
  const arr = s.split(' ')

  let l = 0
  let r = arr.length - 1
  while (l < r) {
    if (arr[r] == ' ') {
      r--
    }
    if (arr[l] == ' ') {
      l++
    }

    let temp = arr[r]
    arr[r] = arr[l]
    arr[l] = temp
    l++
    r--
  }

  let fast = 0
  let slow = 0
  while (arr[fast] === '') {
    fast++
  }
  while (fast < arr.length) {
    if (arr[fast] !== '') {
      arr[slow++] = arr[fast++]
    } else {
      fast++
    }
  }
  console.log('slow, fast', slow, fast)
  console.log('arr', arr)
  // if (arr[slow - 1] === '') {
  //   arr.length = slow - 1
  // } else {
  //   arr.length = slow
  // }
  arr.length = slow

  console.log('arr:', arr)

  return arr.join(' ')
}

const s = 'the sky is blue'
// console.log(reverseWords(s))
// "  hello world  "
console.log(reverseWords('  hello world  '))
// "a good   example"
console.log(reverseWords('a good   example'))
