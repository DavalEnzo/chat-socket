const express = require('express');
const app = express();
const authRoute = require('./Routes/AuthRoute');
const uploadRoute = require('./Routes/UploadRoute');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

mongoose
  .connect(process.env.MONGO_URI, {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    }
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use(cors(
  {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
));

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

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);
app.use("/upload", uploadRoute);
app.use(express.static("uploads"));
