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
    userSocketMap[username] = socket

    socket.on('message', (data) => {
        const receiverSocket = userSocketMap[data.receiver];
        console.log(data);

        if (receiverSocket) {
            console.log("Receiver socket is ", receiverSocket);
            console.log("All sockets are", socket);
            receiverSocket.emit('message', data);
        }
    })
})

server.listen(port, () => {
    console.log(`Server started at ${port}`)
});