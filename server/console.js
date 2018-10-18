import Ws from 'ws';

const WebSocketServer = Ws.Server;

let consoleSocket = null;

export default {
  send(msg) {
    if (consoleSocket) {
      consoleSocket.send(msg);
    }
  },

  bind(server) {
    const wss = new WebSocketServer({
      server,
    });

    wss.on('connection', (ws) => {
      consoleSocket = ws;
      consoleSocket.send('console connected \n');
    });

    wss.on('message', () => {
      // console.log(a, b, c);
    });
  },
};