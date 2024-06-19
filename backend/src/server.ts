import { createServer } from 'http';
import dbConnect from './config/dbConnect.js';
import initializeSockets from './sockets/initializeSockets.js';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const server = createServer(app);

initializeSockets(server);

const PORT = process.env.PORT || 3001;

dbConnect().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
