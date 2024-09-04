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
  getTimestamp: () => void

  map: Map<string, OriginData>
  totalSize: number

  constructor(capacity: number, getTimestamp: () => void) {
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
      data && this.map.set(origin, data)

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
    const data = this.map.get(origin)

    if (data) {
      data.lastUsed = Date.now()
      data.size += size
    } else {
      const newData = {
        origin,
        lastUsed: Date.now(),
        size,
        persistent: false,
      }
      this.map.set(origin, newData)

      while (this.totalSize > this.capacity) {
        const leastRecentlyUsed = this.findLeastRecentlyUsed()

        if (leastRecentlyUsed) {
          this.map.delete(leastRecentlyUsed.origin)
          this.totalSize -= leastRecentlyUsed.size
        } else {
          return false
        }
      }
    }

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
