import { Server } from 'socket.io';
import chatSocket from './chatSocket.js';

const initializeSockets = (server: any) => {
    const io = new Server(server, {
      cors: {
        origin: `${process.env.CORS_URL}`,
        methods: ["GET", "POST"],
      },
      maxHttpBufferSize: 2e7,
    });

    chatSocket(io);
};

export default initializeSockets;
