const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5757 });

wss.on('connection', function connection(ws) {
  console.log('WS : Connected')
  ws.on('message', function incoming(data) {
    console.log('> ' + data)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});