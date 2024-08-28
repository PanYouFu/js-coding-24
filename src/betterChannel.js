// SomeChannel 它允许两个端口之间发送消息。然而，SomeChannel 存在一些问题，它在发送消息时可能会随机延迟，导致消息的接收顺序与发送顺序不同。
// port2接收消息；port1发送消息
const { port1, port2 } = new SomeChannel();
port2.onmessage = (message) => {
    console.log(message); // hi
};
port1.postMessage('hi');
class BetterChannel {
    constructor() {
        const badChannel = new SomeChannel();
        this.id = 0;
        this.cbMap = new Map();
        this.port1 = {};
        this.port2 = {};
        this.port1.postMessage = this.createPostMessage(badChannel.port1, badChannel.port2, this.port2);
        this.port2.postMessage = this.createPostMessage(badChannel.port2, badChannel.port1, this.port1);
    }
    createPostMessage(badSender, badReceiver, peer) {
        badReceiver.onmessage = ({ id, msg }) => {
            if (!peer.onmessage) {
                return;
            }
            peer.onmessage(msg, (response) => {
                if (this.cbMap.has(id)) {
                    this.cbMap.get(id)(response);
                    this.cbMap.delete(id);
                }
            });
        };
        return (msg, cb) => {
            const id = this.id++;
            this.cbMap.set(id, cb);
            badSender.postMessage({
                id,
                msg,
            });
        };
    }
}
export {};
//# sourceMappingURL=betterChannel.js.map