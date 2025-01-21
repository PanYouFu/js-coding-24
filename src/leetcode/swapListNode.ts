// 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
function swapPairs(head: ListNode | null): ListNode | null {
  let dummyNode = new ListNode(0)
  
  let cur = head
  let pre = new ListNode(0)

  while (cur && cur.next) {
    let left = cur
    let right = cur.next

    left.next = right.next
    right.next = left
   

    if (!dummyNode.next) {
      dummyNode.next = right
    }
    pre.next = right
    
    pre = left
    cur = left.next
  }

  return dummyNode.next

  // 递归
}

