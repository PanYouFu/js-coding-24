// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。

var getIntersectionNode = function (headA, headB) {
  const set = new Set()
  let node = null

  while (headA) {
    set.add(headA)
    headA = headA.next
  }

  while (headB && node !== null) {
    if (set.has(headB)) {
      node = headB
    } else {
      headB = headB.next
    }
  }

  return node
}
