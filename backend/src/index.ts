import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();
app.use(cors());

export const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
    maxHttpBufferSize: 2e7,
});

app.get('/', (req, res) => {
    res.json({"test": 1});
});

let numUsers = 0;

io.on("connection", (socket) => {
    let addedUser = false;
    console.log(`new user connected ${socket.id}`)

    socket.on("message", (message: string) => {
        socket.broadcast.emit('new message', {
            id: socket.id,
            message: message
        });
        console.log("Received message: ", message);
    });

    socket.on('add user', () => {
        if (addedUser) return;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        socket.broadcast.emit('user joined', {
            id: socket.id,
            numUsers: numUsers
        });
    });
    
    socket.on("disconnect", () => {
        if (addedUser){ 
            --numUsers;
            socket.broadcast.emit("user left", {
                id: socket.id,
                numUsers: numUsers
            });
        }
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});