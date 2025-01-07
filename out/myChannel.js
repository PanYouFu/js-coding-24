"use strict";
// SomeChannel 它允许两个端口之间发送消息。然而，SomeChannel 存在一些问题，它在发送消息时可能会随机延迟，导致消息的接收顺序与发送顺序不同。
// port2接收消息；port1发送消息
const { port1, port2 } = new Channel();
port2.onmessage = (message) => {
    console.log(message); // hi
};
port1.postMessage('hi');
class MyChannel {
    constructor() {
        this.port1 = {};
        this.port2 = {};
        this.cbMap = new Map();
        this.id = 0;
        const oldChannel = new Channel();
        this.port1.postMessage = (msg, cb) => {
            this.id++;
            this.cbMap.set(this.id, cb);
            oldChannel.port1.postMessage({ msg, id: this.id });
            // 注册原始onmsg事件
            oldChannel.port2.onmessage = ({ msg, id }) => {
                if (!this.port2.onmessage) {
                    return;
                }
                // 触发新onmsg事件
                this.port2.onmessage(msg, (response) => {
                    if (this.cbMap.has(id)) {
                        this.cbMap.get(id)(response);
                        this.cbMap.delete(id);
                    }
                });
            };
        };
        this.port2.postMessage = (msg, cb) => {
            this.id++;
            this.cbMap.set(this.id, cb);
            oldChannel.port2.postMessage({ msg, id: this.id });
            oldChannel.port1.onmessage = ({ msg, id }) => {
                if (!this.port1.onmessage) {
                    return;
                }
                this.port1.onmessage(msg, (response) => {
                    if (this.cbMap.has(id)) {
                        this.cbMap.get(id)(response);
                        this.cbMap.delete(id);
                    }
                });
            };
        };
    }
}
//# sourceMappingURL=myChannel.js.map