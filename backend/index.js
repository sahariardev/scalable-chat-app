import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import {Server} from "socket.io";
import connectToMongoDB from "./db/connection.mongodb.js";
import {addMsgToConversation} from "./controller/msg.controller.js";
import messageRoute from './route/msg.route.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const userSocketMap = {};

const server = http.createServer(app);

app.get('/', (req, res) => {

});

app.use('/messages', messageRoute);

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

        if (receiverSocket) {
            receiverSocket.emit('message', data);
        }

        addMsgToConversation([msg.sender, msg.receiver], msg)
    })
})

server.listen(port, async () => {
    await connectToMongoDB();
    console.log(`Server started at ${port}`)
});