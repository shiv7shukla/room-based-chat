import WebSocket, { WebSocketServer } from "ws";
import { nanoid } from "nanoid";

const wss=new WebSocketServer({port:8080});

interface Message{
    type:"join" | "chat" | "leave",
    socket?:WebSocket,
    payload:{
    sender:string,
    roomId:string,
    text?:string
    }
};

let Users=new Map<WebSocket,Message>();

wss.on("connection",(socket)=>{
    socket.on("message",(message)=>{
        // @ts-ignore
        const parsedMessage=JSON.parse(message.toString());

        if(parsedMessage.type=="join")
        {
            parsedMessage.socket=socket;
            Users.set(socket,parsedMessage);
        }

        if(parsedMessage.type==="chat")
        {
            if(!Users.get(socket))
                return;
            Users.forEach((value)=>{
                value.socket?.send(parsedMessage.payload.text);
            })
        }
    })
})