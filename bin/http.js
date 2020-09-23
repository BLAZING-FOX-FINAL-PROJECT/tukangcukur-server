"use strict"

const app = require("../app.js")

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000

io.on("connection", (socket) => {
  console.log("New client connected");
  
  socket.on("chat", payload => {
    //payload: {}
  })

  socket.on("endTransactionServer", payload => {
    console.log('masuk server', payload)
    // io.emit("endTransaction", payload)
    // io.emit
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, ()=>{console.log('nyala:' + port)})

// let interval;

// const getApiAndEmit = socket => {
//   const response = new Date();
//   socket.emit("FromAPI", response);
// };
