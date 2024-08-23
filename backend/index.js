import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import {Server} from "socket.io";
import connectToMongoDB from "./db/connection.mongodb.js";
import {addMsgToConversation} from "./controller/msg.controller.js";
import messageRoute from './route/msg.route.js'
import {subscribe, publish, getChannelNameFromUserName} from "./redis/pubsub.service.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const userSocketMap = {};

const server = http.createServer(app);

app.use(cors({
    credentials: true,
    origin: '*'
}));

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
    userSocketMap[username] = socket;

    subscribe(getChannelNameFromUserName(username), (message) => {
        //use socket to send this message
        socket.emit('message', JSON.parse(message));
    });

    socket.on('message', (data) => {
        const receiverSocket = userSocketMap[data.receiver];

        if (receiverSocket) {
            receiverSocket.emit('message', data);
        } else {
            publish(getChannelNameFromUserName(data.receiver, JSON.stringify(data)));
        }

        addMsgToConversation([data.sender, data.receiver], data)
    })
})

server.listen(port, async () => {
    await connectToMongoDB();
    console.log(`Server started at ${port}`)
});