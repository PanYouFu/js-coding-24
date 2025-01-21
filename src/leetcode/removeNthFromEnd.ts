// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // -------------计数法----------------------------------
  // let len = 0
  // let cur = head
  // while (cur) {
  //   len++
  //   cur = cur.next
  // }
  // const delIdx = len - n
  // let pre: ListNode = new ListNode(0, head)
  // let curIdx = 0
  // if (delIdx === 0) {
  //   head = head?.next || null
  //   return head
  // } else {
  //   let curNode = pre
  //   while (curIdx < delIdx) {
  //     curIdx++
  //     curNode = curNode?.next as ListNode
  //   }
  //   curNode.next = curNode?.next?.next || null
  // }
  // return pre?.next || null
  // ----------------------------------------------------

  // -------------------快慢指针--------------------------
  // 快指针先走 n 步；慢指针再开始走；当快指针到达终点时，慢指针刚好停留在需要删除的那个节点上
  // a,b,c,d,e,f,g
  // [1] 1
  if (n === 0) return head

  let fast = 0
  let newHead = new ListNode(0, head)
  let fastNode: ListNode = newHead
  let slowNode: ListNode = newHead

  while (fast <= n) {
    fastNode = fastNode.next as ListNode
    fast++
  }

  while (fastNode) {
    fastNode = fastNode.next as ListNode
    slowNode = slowNode.next as ListNode
  }

  slowNode.next = slowNode.next!.next

  return newHead.next

  // ----------------------------------------------------
}
