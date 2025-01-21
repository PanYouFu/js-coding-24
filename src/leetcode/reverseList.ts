
function reverseList(head: ListNode | null): ListNode | null {
  let pre = null
  let cur = head

  while (cur) {
    let temple = cur.next
    cur.next = pre
    pre = cur
    cur = temple
  }

  return pre

}