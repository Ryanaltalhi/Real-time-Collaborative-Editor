// The first few lines import necessary modules: express, http, socket.io, and path.
const express = require('express');
const http = require('http');

//We create a socket.io instance (io) and attach it to the server to handle real-time communication between the client and server.
const socketIO = require('socket.io');
const path = require('path');

//We create an Express app (app) and a Node.js server (server) using the http module.
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//We set the port variable to 3000.
const port = 3000;

/*The app.use(express.static(path.join(__dirname, '/'))); line serves static files 
(HTML, CSS, and JavaScript) from the root directory of the server. This makes sure that when clients 
request these files, the server sends them the appropriate content. */
app.use(express.static(path.join(__dirname, '/')));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('editor-update', (text) => {
    socket.broadcast.emit('editor-update', text);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
