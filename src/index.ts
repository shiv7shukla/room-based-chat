import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

dotenv.config();
const MONGO_URL=process.env.MONGO_URL;

(async()=>{
    try{
        //@ts-ignore
        await mongoose.connect(MONGO_URL);
        console.log("connected");
    }
    catch{
        console.log("can't connect to database");
    }
})();

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
                if(value.socket!=socket)
                value.socket?.send(parsedMessage.payload.text);
            })
        }
    })
})