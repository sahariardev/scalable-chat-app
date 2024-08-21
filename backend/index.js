import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import {Server} from "socket.io";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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
    console.log('client connected')

    const username = socket.handshake.query.username;
    console.log(username);

    socket.on('message', (data) => {
        console.log(`message is ${data}`);
        socket.broadcast.emit('message', data);
    })
})

server.listen(port, () => {
    console.log(`Server started at ${port}`)
});