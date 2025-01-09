// 给定一个正整数 n，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。
// 示例:
// 输入: 3 输出: [ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]
function generateMatrix(n: number): number[][] {
  const nums: number[][] = new Array(n).fill([]).map((item) => [])

  let loops = n >> 1
  let start = 0
  let curNum = 1
  let startR = 0
  let startC = 0

  while (start < loops) {
    let dis = n - start * 2
    let { cur } = generate(dis, startR, startC, curNum, nums)
    curNum = cur
    startR++
    startC++
    start++
  }

  // 奇数时中间只有一个数
  if (n % 2 === 1) {
    nums[startR][startC] = curNum
  }

  return nums
}

function generate(
  dis: number,
  row: number,
  col: number,
  cur: number,
  arr: number[][]
) {
  let startR = row
  let startC = col
  // 向右
  let endC = col + dis - 1
  while (col < endC) {
    arr[row][col] = cur
    col++
    cur++
  }
  // 向下
  let endR = row + dis - 1
  while (row < endR) {
    arr[row][col] = cur
    row++
    cur++
  }
  // 向左
  while (col > startC) {
    arr[row][col] = cur
    col--
    cur++
  }
  // 向上
  while (row > startR) {
    arr[row][col] = cur
    row--
    cur++
  }

  return { cur }
}

console.log('generateMatrix--------')
console.log(generateMatrix(3).forEach((item) => console.log(item)))
