// he first line establishes a WebSocket connection to the server 
//using io() from the socket.io.js library loaded in the HTML file.
const socket = io();

//We get a reference to the textarea element with the id "editor" using document.getElementById.
const editor = document.getElementById('editor');

/* The socket.on('editor-update', ...) function listens for updates from the server.
 When the server sends an "editor-update" event, the callback function will be executed, 
and the text received from the server will be set as the value of the textarea, 
updating the editor content in real-time.*/

socket.on('editor-update', (text) => {
  editor.value = text;
});

/*The editor.addEventListener('input', ...) function listens for user input in the textarea. 
When the user types or modifies the text, the callback function will be executed, and the text 
will be sent to the server using socket.emit('editor-update', ...). This way, the server 
can broadcast the changes to all connected clients, enabling real-time collaboration.*/

editor.addEventListener('input', () => {
  const text = editor.value;
  socket.emit('editor-update', text);
});
