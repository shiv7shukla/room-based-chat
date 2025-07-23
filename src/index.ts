import WebSocket, { WebSocketServer } from "ws";
const wss=new WebSocketServer({port:8080});

interface Message{
    type:"join" | "chat" | "leave",
    payload:{
    sender:string,
    roomId:string,
    text?:string
    }
};

const Users=new Map<string,Message>();

