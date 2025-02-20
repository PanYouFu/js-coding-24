function fourSumCount(
  nums1: number[],
  nums2: number[],
  nums3: number[],
  nums4: number[]
): number {
  const map = new Map()
  let count = 0
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      const cur = nums1[i] + nums2[j]
      map.set(cur, (map.get(cur) || 0) + 1)
    }
  }

  for (let i = 0; i < nums3.length; i++) {
    for (let j = 0; j < nums4.length; j++) {
      const cur = 0 - (nums1[i] + nums2[j])
      count += map.get(cur) || 0
    }
  }

  return count
}
