const express = require('express');
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        // origin: "http://ec2-34-234-76-96.compute-1.amazonaws.com:666",
        origin: `*`,
        transports: ["websocket"],
        methods: ["GET", "POST"],
    }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('leave', (data) => {
    socketIO.emit('leaveResponse', data)
  })

  //Listens and logs the message to the console
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  socket.on('join', (data) => {
    socketIO.emit('joinResponse', data);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});


app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`);
});
