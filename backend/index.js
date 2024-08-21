import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import {Server} from "socket.io";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const userSocketMap = {};

const server = http.createServer(app);

app.get('/', (req, res) => {

});

const io = new Server(server, {
    cors: {
        allowedHeaders: ['*'],
        origin: "*"
    }
})

io.on('connection', (socket) => {
    const username = socket.handshake.query.username;
    userSocketMap[username] = socket;

    socket.on('message', (data) => {
        const receiverSocket = userSocketMap[data.receiver];

        if (receiverSocket) {
            receiverSocket.emit('message', data.message);
        }

        socket.broadcast.emit('message', data);
    })
})

server.listen(port, () => {
    console.log(`Server started at ${port}`)
});