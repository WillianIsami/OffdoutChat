import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';

export const app = express();
app.use(cors());

export const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.ORIGIN_URL,
        methods: ["GET", "POST"],
    },
    maxHttpBufferSize: 2e7
});

io.on("connection", (socket) => {
    console.log(`new user connected ${socket.id}`)

    io.on("message", (message: string) => {
        console.log("Received message: ", message);
        io.emit("message", message);
    });
});

const PORT = process.env.POST || 3001;
server.listen(PORT, () => {
    console.log("Server started on port 3001");
})