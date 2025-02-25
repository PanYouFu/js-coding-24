function canConstruct(ransomNote: string, magazine: string): boolean {
  const map = new Map()

  for (let i = 0; i < magazine.length; i++) {
    map.set(magazine[i], (map.get(magazine[i]) || 0) + 1)
  }

  for (let i = 0; i < ransomNote.length; i++) {
    if (map.has(ransomNote[i])) {
      const n = map.get(ransomNote[i])
      if (n <= 0) {
        return false
      } else {
        map.set(ransomNote[i], n - 1)
      }
    } else {
      return false
    }
  }

  return true
}
