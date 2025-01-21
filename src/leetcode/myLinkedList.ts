class ListNode {
  val: number
  next: ListNode | null

  constructor(val: number, next?: ListNode | null) {
    this.val = val
    this.next = next || null
  }
}

class MyLinkedList {
  private size: number
  private head: ListNode | null
  private tail: ListNode | null
  constructor() {
    this.size = 0
    this.head = null
    this.tail = null
  }

  getNode(index: number): ListNode | null {
    let cur: ListNode | null = new ListNode(0, this.head)
    for (let i = 0; i <= index; i++) {
      cur = cur?.next || null
    }
    return cur
  }

  get(index: number): number {
    if (index < 0 && index > this.size - 1) {
      return -1
    }
    const cur = this.getNode(index)

    return cur?.val !== undefined ? cur?.val : -1
  }

  addAtHead(val: number): void {
    const cur = new ListNode(val, this.head)
    this.head = cur
    if (!this.tail) {
      this.tail = cur
    }
    this.size++
  }

  addAtTail(val: number): void {
    let node: ListNode = new ListNode(val, null)
    if (this.tail) {
      this.tail.next = node
    } else {
      this.head = node
    }
    this.tail = node
    this.size++
  }

  addAtIndex(index: number, val: number): void {
    if (index === this.size) {
      this.addAtTail(val)
      return
    }
    if (index > this.size) {
      return
    }
    // <= 0 的情况都是在头部插入
    if (index <= 0) {
      this.addAtHead(val)
      return
    }
    // 正常情况
    // 获取插入位置的前一个 node
    let curNode = this.getNode(index - 1) as ListNode
    let node: ListNode = new ListNode(val, curNode?.next)
    curNode.next = node
    this.size++
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.size) {
      return
    }
    // 处理头节点
    if (index === 0) {
      this.head = this.head!.next
      // 如果链表中只有一个元素，删除头节点后，需要处理尾节点
      if (index === this.size - 1) {
        this.tail = null
      }
      this.size--
      return
    }
    // 索引有效
    let curNode: ListNode = this.getNode(index - 1) as ListNode
    curNode.next = curNode.next!.next
    // 处理尾节点
    if (index === this.size - 1) {
      this.tail = curNode
    }
    this.size--
  }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
