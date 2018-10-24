import Ws from 'ws';

const WebSocketServer = Ws.Server;

let consoleSocket = null;

export default {
  send(msg, messageId) {
    if (consoleSocket) {
      // TODO we wiill send command ID to group commands in separated console windows
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
