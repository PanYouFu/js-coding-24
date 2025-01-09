interface SomePort {
  postMessage: (message: any) => void
  onmessage?: (message: any) => void
}

declare class SomeChannel {
  port1: SomePort
  port2: SomePort
}

// SomeChannel 它允许两个端口之间发送消息。然而，SomeChannel 存在一些问题，它在发送消息时可能会随机延迟，导致消息的接收顺序与发送顺序不同。
// port2接收消息；port1发送消息
const { port1, port2 } = new SomeChannel()
port2.onmessage = (message) => {
  console.log(message) // hi
}
port1.postMessage('hi')
// ------

// 任务的核心目标是：

// 创建一个 BetterChannel，它在 SomeChannel 的基础上实现消息的发送和接收。
// BetterChannel 要提供一个能够处理消息的回调机制，并允许在收到消息后进行回复。
// 必须使用 SomeChannel 进行消息传递。
// 避免在类之外使用全局状态。
// 处理消息可能会被延迟的情况，还需要考虑消息丢失的可能性。

type GoodPort = { postMessage: (msg: any, cb: any) => void; onmessage?: any }
class BetterChannel {
  id: number
  cbMap: Map<any, any>
  port1: GoodPort
  port2: GoodPort
  constructor() {
    const badChannel = new SomeChannel()
    this.id = 0
    this.cbMap = new Map()
    this.port1 = {} as GoodPort
    this.port2 = {} as GoodPort
    this.port1.postMessage = this.createPostMessage(
      badChannel.port1,
      badChannel.port2,
      this.port2
    )
    this.port2.postMessage = this.createPostMessage(
      badChannel.port2,
      badChannel.port1,
      this.port1
    )
  }
  createPostMessage(
    badSender: SomePort,
    badReceiver: SomePort,
    peer: GoodPort
  ) {
    badReceiver.onmessage = ({ id, msg }) => {
      if (!peer.onmessage) {
        return
      }
      peer.onmessage(msg, (response: any) => {
        if (this.cbMap.has(id)) {
          this.cbMap.get(id)(response)
          this.cbMap.delete(id)
        }
      })
    }
    return (msg: any, cb: any) => {
      const id = this.id++
      this.cbMap.set(id, cb)

      badSender.postMessage({
        id,
        msg,
      })
    }
  }
}

export {}
