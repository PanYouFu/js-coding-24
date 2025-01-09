// 给你一个按 **非递减顺序** 排序的整数数组 `nums`，返回 **每个数字的平方** 组成的新数组，要求也按 **非递减顺序** 排序
function sortedSquares(nums: number[]): number[] {
  let l = 0
  let r = nums.length - 1
  const ans = []

  while (l <= r) {
    if (Math.abs(nums[l]) < Math.abs(nums[r])) {
      ans.unshift(Math.abs(nums[r]) * Math.abs(nums[r]))
      r--
    } else {
      ans.unshift(Math.abs(nums[l]) * Math.abs(nums[l]))
      l++
    }
  }

  return ans
}

console.log(sortedSquares([-4, -1, 0, 3, 10]))
console.log(sortedSquares([-7, -3, 2, 3, 11]))
// [-4,-1,0,3,10]
// [-7,-3,2,3,11]
