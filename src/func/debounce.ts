// 防抖的作用：避免短时间内函数多次执行。而是延迟到一定时间后再执行
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timer: any = null

  const debounced = (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func(...args)
    }, wait)
  }

  return debounced as T
}
