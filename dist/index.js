"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
;
let Users = new Map();
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        // @ts-ignore
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type == "join") {
            parsedMessage.socket = socket;
            Users.set(socket, parsedMessage);
        }
        if (parsedMessage.type === "chat") {
            if (!Users.get(socket))
                return;
            Users.forEach((value) => {
                var _a;
                (_a = value.socket) === null || _a === void 0 ? void 0 : _a.send(parsedMessage.payload.text);
            });
        }
    });
});
