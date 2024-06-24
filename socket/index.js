const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  //add new user
  socket.on("new-user-add", (newUserId) => {
    //if user not added previously

    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("connected users", activeUsers);

    //when want to send
    io.emit("get-users", activeUsers);
  });

  //send real time message
  socket.on("send-message", (data) => {
    const { receiverId } = data;

    const user = activeUsers.find((user) => user.userId === receiverId);

    console.log("Sending from socket.io", receiverId);
    console.log("Data", data);

    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("user disconnected");
    io.emit("get-users", activeUsers);
  });
});
