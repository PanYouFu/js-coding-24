// 输入：nums = [0,1,2,2,3,0,4,2], val = 2
// 输出：5, nums = [0,1,4,0,3,_,_,_]
function removeElement(nums: number[], val: number): number {
  let slow = 0
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] === val) {
      fast++
    } else {
      nums[slow] = nums[fast]
      slow++
    }
  }

  return slow
}

const nums = [0, 1, 2, 2, 3, 0, 4, 2]
const val = 2
console.log(removeElement(nums, val))
