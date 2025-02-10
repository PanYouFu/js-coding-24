// 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

// 使用set
function detectCycle(head: ListNode | null): ListNode | null {
  const set = new Set()
  let current = head

  while (current) {
    if (set.has(current)) {
      return current
    }
    set.add(current)
    current = current.next
  }

  return null
}
