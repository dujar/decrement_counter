import moment from 'moment'
import express from 'express'
import cors from 'cors'
import path from 'path'
import WS from 'websocket'
import http from 'http'
export const runApp = async (arg?: string | number) => {
  let tick: string | number = arg || process.argv[2]
  console.log('running application with arg:', tick)
  const app = express()

  tick = validateArg(tick as string)

  console.log('tick is:', tick)
  let now = moment.utc()
  let wsServer: WS.server
  let counter = tick;

  setInterval(() => {
    counter += Number(tick)
    now = now.subtract(Number(tick) as number, 'seconds')
    broadcastTime(now.toString())
    console.log("decrement: ", tick, "counter in seconds: ",counter,"time: ",now.toString())
  }, 1000)

  app
    .use(cors())
    .get('/time', (req, res) => {
      res.json({ clock: now })
    })
    .get('/counter', (req, res) => {
      res.json({ decrement: tick })
    })
    .get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '/index.html'))
    })

  const server = http.createServer(app).listen(8080, () => {
    console.log('app running in port', 8080)
  })

  wsServer = new WS.server({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: true,
  })

  let connections: WS.connection[] = []
  function broadcastTime(time: string) {
    if (connections.length > 0) {
      connections.forEach((c) => c.sendUTF(time))
    }
  }
  wsServer.on('connect', (c) => {
    console.log('ws: connection started')
    connections.push(c)
    console.log("outstanding connections: ", connections.length)
    c.on('message', (d) => {
      console.log(d)
    })
  })
  wsServer.on('close', (c) => {
    const ref = c.socket.ref()
    connections = connections.filter((c) => c.socket.ref() != ref)
    console.log("connections left:", connections.length)
  })
}

export function validateArg(arg: string) {
  try {
    const counter = Number(arg)
    if (!counter || counter < 0 || !Number.isInteger(counter)) {
      throw 'counter needs to be an integer > 0'
    }
    return counter
  } catch (e) {
    throw 'counter needs to be an integer > 0'
  }
}
