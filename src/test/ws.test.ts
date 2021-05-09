import axios from "axios";
import {runApp} from "../main";
import { connection} from "websocket";
import moment from "moment";

describe("check ws subscription",()=>{
    
    const WS = require('websocket').client;
    const client = new WS()
    let ws: connection;
    
    beforeAll(async()=>{
        await runApp(3)
        client.connect('ws://localhost:8080/', 'echo-protocol');
        ws = await new Promise((resolve)=>{
            client.on('connect', function(c:connection) {
            console.log('WebSocket Client Connected');
            resolve(c)
            c.on('error', function(error:any) {
                console.log("Connection Error: " + error.toString());
            });
            });

        });

    })

    test("check server running", async ()=>{
        await axios.get("http://localhost:8080/counter").then(d=>{
            expect(JSON.stringify(d.data)).toBe(JSON.stringify({ decrement: 3 }))
        }).catch((e)=>{
            throw(e)
        })
    })

    test("connect to ws", async ()=>{
        console.log("running connect ws")
        const message: any  = await new Promise((resolve) => {
            ws.on("message",(data)=>{
            console.log("message from server",data);
            resolve(data)
            })
        })
        const date = message?.utf8Data
        expect(moment(date).format("LLL")).toBe(moment().format("LLL"));            
    })
})