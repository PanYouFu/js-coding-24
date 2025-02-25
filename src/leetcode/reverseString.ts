function reverseString(s: string[]): void {
  let left = 0
  let right = s.length - 1

  while (left < right) {
    const lVal = s[left]
    const rVal = s[right]
    s[left] = rVal
    s[right] = lVal

    left++
    right--
  }
}
