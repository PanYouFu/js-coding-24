interface OriginData {
  origin: string
  lastUsed: number
  size: number
  persistent: boolean
}

interface LRUStorage {
  capacity: number
  getData(origin: string): OriginData | undefined
  setData(origin: string, size: number): boolean
  clearData(origin: string): void
  makePersistent(origin: string): void
}

// LRU (Least Recently Used) 算法是一种常见的缓存淘汰策略，用于管理数据缓存。
// 当缓存达到容量限制时，LRU 算法会移除最久未使用的数据，保证最近使用的数据得以保留。

// 缓存容量有限：缓存有一个固定大小（容量）。当缓存满了，需要移除一些旧的数据以腾出空间。
// 访问时间戳：每当数据被访问时，更新其访问时间戳。
// 移除策略：移除最近最少使用的（也就是时间戳最早的）数据。
class MyLRUStorage implements LRUStorage {
  capacity: number
  getTimestamp: (() => void) | undefined

  map: Map<string, OriginData>
  totalSize: number

  constructor(capacity: number, getTimestamp?: () => void) {
    this.capacity = capacity
    this.getTimestamp = getTimestamp

    this.map = new Map<string, OriginData>()
    this.totalSize = 0
  }

  // to use the data for origin
  // return size of the data or undefined if not exist
  getData(origin: string): OriginData | undefined {
    const data = this.map.get(origin)

    if (data) {
      data.lastUsed = Date.now()
      this.map.delete(origin)
      this.map.set(origin, data)

      return data
    } else {
      return undefined
    }
  }

  // updating data for origin
  // return boolean to indicate success or failure
  // If the total size exceeds capacity,
  // Least Recently Used non-persistent origin data other than itself should be evicted.
  setData(origin: string, size: number): boolean {
    // 若当前值大小大于容量
    if (size > this.capacity) {
      return false
    }

    // 是否存在该字段
    const { size: curSize, persistent } =
      this.map.get(origin) || ({} as OriginData)

    this.totalSize = this.totalSize + size

    // 若存在，且当前值小于塞入值
    if (curSize && curSize <= size) {
      // 当前的总量
      this.totalSize = this.totalSize - curSize
      this.map.delete(origin)
      this.map.set(origin, { origin, size, persistent, lastUsed: Date.now() })

      // 总量超出容量，进行删除
      while (this.totalSize > this.capacity) {
        const leastRecentlyUsed = this.findLeastRecentlyUsed()

        if (leastRecentlyUsed) {
          this.map.delete(leastRecentlyUsed.origin)
          this.totalSize -= leastRecentlyUsed.size
        } else {
          this.totalSize -= size
          return false
        }
      }
      return true
    } else if (curSize && curSize > size) {
      // 当前的总量
      this.totalSize = this.totalSize - curSize
      this.map.delete(origin)
      this.map.set(origin, { origin, size, persistent, lastUsed: Date.now() })
      return true
    }

    // 为新key
    while (this.totalSize > this.capacity) {
      const leastRecentlyUsed = this.findLeastRecentlyUsed()

      if (leastRecentlyUsed) {
        this.map.delete(leastRecentlyUsed.origin)
        this.totalSize -= leastRecentlyUsed.size
      } else {
        this.totalSize -= size
        return false
      }
    }

    this.map.set(origin, {
      origin,
      size,
      persistent: false,
      lastUsed: Date.now(),
    })
    return true
  }

  // manually clear data for origin
  clearData(origin: string): void {
    const data = this.map.get(origin)
    if (data) {
      this.totalSize -= data.size
      this.map.delete(origin)
    }
  }

  // change data for origin to be persistent
  // it only handles existing data not the data added later
  // persistent data cannot be evicted unless manually clear it
  makePersistent(origin: string): void {
    const data = this.map.get(origin)

    if (data) {
      data.persistent = true
    }
  }

  private findLeastRecentlyUsed = () => {
    let leastRecentlyUsed: OriginData | undefined = undefined

    for (let i = 0; i < [...this.map.values()].length; i++) {
      const data = [...this.map.values()][i]
      // console.log('data.', data.origin, data.lastUsed)
      if (!data.persistent) {
        if (!leastRecentlyUsed) {
          leastRecentlyUsed = data
        } else {
          if (data.lastUsed < leastRecentlyUsed.lastUsed) {
            leastRecentlyUsed = data
          }
        }
      }
    }

    return leastRecentlyUsed
  }
}

const storage = new MyLRUStorage(10)

storage.setData('a', 1)
storage.setData('b', 3)
storage.setData('c', 6)
storage.setData('c', 1)
console.log(storage.getData('a')?.size)
console.log(storage.getData('b')?.size)
console.log(storage.getData('c')?.size)
// ----------------------------------------------------------------------------------

// storage.setData('a', 1)
// storage.setData('b', 3)
// storage.setData('c', 6)

// console.log(storage.getData('a')?.size)
// console.log(storage.getData('b')?.size)
// console.log(storage.getData('c')?.size)

// ----------------------------------------------------------------------------------
// storage.setData('a', 1)
// storage.setData('b', 3)
// storage.setData('c', 6)

// console.log(storage.setData('a', 4)) // true

// console.log(storage.getData('a')?.size) // 4

// console.log(storage.getData('b')) // undefined

// console.log(storage.getData('c')?.size) // 6

// ----------------------------------------------------------------------------------
// storage.setData('a', 1)
// storage.setData('b', 3)
// storage.getData('a')
// storage.setData('c', 7)

// console.log(storage.getData('a')?.size)
// console.log(storage.getData('b'))
// console.log(storage.getData('c')?.size)

// ----------------------------------------------------------------------------------
// storage.setData('a', 1)
// storage.setData('b', 3)
// storage.makePersistent('a')
// storage.makePersistent('b')

// console.log(storage.setData('c', 7)) // false

// storage.clearData('b')
// storage.setData('c', 7)

// console.log(storage.getData('a')?.size) // 1

// console.log(storage.getData('b')) // undefined
// console.log(storage.getData('c')?.size) // 7

// ----------------------------------------------------------------------------------
// storage.setData('a', 1)
// storage.setData('b', 3)
// storage.setData('c', 6)
// storage.setData('c', 1)

// console.log(storage.getData('a')?.size)
// console.log(storage.getData('b')?.size)
// console.log(storage.getData('c')?.size)
// ----------------------------------------------------------------------------------
// storage.setData('a', 1)
// console.log('storage:', storage)
// storage.setData('b', 3)
// console.log('storage:', storage)
// storage.setData('c', 7)
// console.log('storage:', storage)

// console.log('storage.getData(a):', storage.getData('a'))
// console.log('storage.getData(b).size:', storage.getData('b')?.size)
// console.log('storage.getData(c).size:', storage.getData('c')?.size)
// ----------------------------------------------------------------------------------
// storage.setData('a', 1)
// storage.setData('b', 2)
// storage.setData('c', 3)
// const ans = storage.setData('d', 11)
// console.log('ans:', ans)
// console.log('storage.getData(a).size):', storage.getData('a')?.size)
// console.log('storage.getData(b).size):', storage.getData('b')?.size)
// console.log('storage.getData(c).size):', storage.getData('c')?.size)
// console.log('storage.getData(d).size):', storage.getData('d')?.size)
// ----------------------------------------------------------------------------------
// storage.setData('a', 1)
// storage.setData('b', 3)
// storage.getData('a')
// storage.setData('c', 7)
// console.log('storage.getData(a).size):', storage.getData('a')?.size)
// console.log('storage.getData(b):', storage.getData('b'))
// console.log('storage.getData(c).size):', storage.getData('c')?.size)
// ----------------------------------------------------------------------------------
