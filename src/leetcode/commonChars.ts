function commonChars(words: string[]): string[] {
  if (words.length === 0) return []

  const map = new Map<string, number>()

  for (const char of words[0]) {
    map.set(char, (map.get(char) || 0) + 1)
  }

  for (let i = 1; i < words.length; i++) {
    const word = words[i]

    const curMap = new Map<string, number>()
    for (const curChar of word) {
      curMap.set(curChar, (curMap.get(curChar) || 0) + 1)
    }

    for (const [char, count] of map) {
      const curCount = curMap.get(char) || 0

      if (curCount === 0) {
        map.delete(char)
      } else {
        map.set(char, Math.min(curCount, count))
      }
    }
  }

  const ans: string[] = []
  for (const [char, count] of map) {
    console.log('new Array(count).fill(char)', new Array(count).fill(char))
    ans.push(...new Array(count).fill(char))
  }

  return ans
}

console.log(commonChars(['bella', 'label', 'roller']))
