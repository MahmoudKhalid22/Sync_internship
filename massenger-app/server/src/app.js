const express = require("express");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const harperSaveMessage = require("./services/harper");
const harperGetMessages = require("./services/getMessage");
const leaveRoom = require("./utils/leaveRoom"); // Add this

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

// const server = http.createServer(app); // Add this
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    // methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "chatbot";

let chatRoom = "";
let allUsers = [];

io.on("connection", (socket) => {
  // console.log(`User connected ${socket.id}`);

  socket.on("join_room", async (data) => {
    const { username, room } = data;

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });

    const chatRoomUsers = allUsers.filter((user) => user.room === room);

    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    socket.join(room); // Join the user to a socket room
    let __createdtime__ = Date.now();
    // socket.to(room).emit("receive_message", {
    //   message: `${username} has joined the chat room`,
    //   username: CHAT_BOT,
    //   __createdtime__,
    // });

    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });

    socket.on("send_message", (data) => {
      const { message, username, room, __createdtime__ } = data;
      io.in(room).emit("receive_message", data); // Send to all users in room, including sender
      harperSaveMessage(message, username, room, __createdtime__) // Save message in db
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    });

    // const getMessage = fetch('').then(() => )
    // const v = await fetch('')
    // v.()=>

    try {
      const getMsg = await harperGetMessages(room);
      getMsg((last100Messages) => {
        socket.emit("last_100_messages", last100Messages);
      });
    } catch (err) {
      // .catch((err) => console.log(err));
      console.log(err);
    }

    // harperGetMessages(room)
    // .then((last100Messages) => {
    //   // console.log('latest messages', last100Messages);
    //   socket.emit('last_100_messages', last100Messages);
    // })

    socket.on("leave_room", (data) => {
      const { username, room } = data;
      socket.leave(room);
      const __createdtime__ = Date.now();
      // Remove user from memory
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(room).emit("chatroom_users", allUsers);
      socket.to(room).emit("receive_message", {
        username: CHAT_BOT,
        message: `${username} has left the chat`,
        __createdtime__,
      });
      // console.log(`${username} has left the chat`);
    });

    socket.on("disconnect", () => {
      // console.log("User disconnected from the chat");
      const user = allUsers.find((user) => user.id == socket.id);
      if (user?.username) {
        allUsers = leaveRoom(socket.id, allUsers);
        socket.to(chatRoom).emit("chatroom_users", allUsers);
        socket.to(chatRoom).emit("receive_message", {
          message: `${user.username} has disconnected from the chat.`,
        });
      }
    });
  });
});

server.listen(port, () => console.log("Server is running now on port " + port));

// // Listen for when the client connects via socket.io-client
// io.on("connection", (socket) => {
//   console.log(`User connected ${socket.id}`);

//   // Add a user to a room
//   socket.on("join_room", (data) => {
//     const { username, room } = data; // Data sent from client when join_room event emitted
//     socket.join(room); // Join the user to a socket room

//     // Add this
//     let __createdtime__ = Date.now(); // Current timestamp
//     // Send message to all users currently in the room, apart from the user that just joined
//     socket.to(room).emit("receive_message", {
//       message: `${username} has joined the chat room`,
//       username: CHAT_BOT,
//       __createdtime__,
//     });
//   });
// })
