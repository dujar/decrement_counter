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
  let now = moment()
  let wsServer: WS.server

  setInterval(() => {
    now = now.subtract(tick as number, 'seconds')
    broadcastTime(now.toString())
    console.log(now)
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

  let connection: WS.connection[] = []
  function broadcastTime(time: String) {
    if (connection) {
      connection.forEach((c) => c.sendUTF(time))
    }
  }
  wsServer.on('connect', (c) => {
    console.log('ws: connection started')
    connection.push(c)
    c.on('message', (d) => {
      console.log(d)
    })
  })
  wsServer.on('close', (c) => {
    const ref = c.socket.ref

    console.log(c)
    console.log(ref)
    connection = connection.filter((c) => c.socket.ref != ref)
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
