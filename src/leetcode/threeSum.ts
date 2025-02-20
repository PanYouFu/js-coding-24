function threeSum(nums: number[]): number[][] {
  const ans = []
  const arr = nums.sort((a, b) => a - b)

  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i]

    if (cur > 0) {
      break
    }

    if (i > 0 && arr[i - 1] === cur) {
      continue
    }

    let left = i + 1
    let right = arr.length - 1
    const target = 0 - cur
    while (left < right) {
      if (arr[left] + arr[right] === target) {
        console.log('[i, left, right]:', [arr[i], arr[left], arr[right]])
        ans.push([arr[i], arr[left], arr[right]])
        while (arr[left] === arr[left + 1]) {
          left++
        }
        while (arr[right] === arr[right - 1]) {
          right--
        }
        left++
        right--
      } else if (arr[left] + arr[right] < target) {
        left++
      } else if (arr[left] + arr[right] > target) {
        right--
      }
    }
  }

  return ans
}

// [-1,0,1,2,-1,-4]
console.log('threeSum', threeSum([-1, 0, 1, 2, -1, -4]))
