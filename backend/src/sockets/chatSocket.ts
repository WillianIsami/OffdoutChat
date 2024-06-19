import { Server, Socket } from 'socket.io';
import Message from '../models/Message.js';

const chatSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`new user connected ${socket.id}`)

    socket.on('sendMessage', async (data) => {
      const message = new Message(data);
      await message.save();
      io.emit('message', message);
    });

    socket.on("message", async (content: string) => {
      const obj_message = {
        userId: socket.id,
        content: content,
        timestamp: new Date().toISOString(),
      }
      const message = new Message(obj_message);
      await message.save();
      io.emit('new message', obj_message);
      console.log("Received message: ", content);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

export default chatSocket;
