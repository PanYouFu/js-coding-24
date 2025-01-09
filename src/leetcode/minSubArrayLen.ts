// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。
// 快慢指针
function minSubArrayLen(target: number, nums: number[]): number {
  let slow = 0
  let sum = 0
  let ans = Infinity

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    while (sum >= target) {
      ans = Math.min(ans, i - slow + 1)
      sum = sum - nums[slow]
      slow++
    }
  }

  return ans === Infinity ? 0 : ans
}
// target = 7, nums = [2,3,1,2,4,3]
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]))
