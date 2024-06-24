const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");
const messageModel = require("./models/messageModel");
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//db & routes
require("./db/db");
app.use(require("./routes/userRoutes"));
app.use(require("./routes/companyRoutes"));
app.use(require("./routes/alumniRoutes"));
app.use(require("./routes/chatRoutes"));
app.use(require("./routes/messageRoutes"));
app.use("/uploads", express.static(__dirname + "/uploads"));

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("join", ({ userId, alumniId }) => {
//     const room = [userId, alumniId].sort().join("-");
//     socket.join(room);
//     console.log(`User ${userId} joined room ${room}`);
//   });

//   socket.on("sendMessage", async ({ userId, alumniId, message }) => {
//     const room = [userId, alumniId].sort().join("-");

//     // Find the document or create a new one if it doesn't exist
//     let messageDoc = await messageModel.findOne({ userId, alumniId });

//     if (!messageDoc) {
//       messageDoc = new messageModel({
//         userId,
//         alumniId,
//         messages: [],
//       });
//     }

//     // Push the new message object into the array
//     messageDoc.messages.push({ message });

//     // Save the updated document
//     await messageDoc.save();

//     // Emit the new message to all clients in the room
//     io.to(room).emit("receiveMessage", {
//       ...messageDoc.messages.slice(-1)[0]._doc,
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

app.listen(port, () => {
  console.log("App is listing on PORT : ", colors.rainbow(port));
});
