'use client'

import React, {useEffect, useState} from "react";
import io from 'socket.io-client';

const Chat = () => {

    const [msg, setMsg] = useState('');
    const [socket, setSocket] = useState(null);
    const [msgs, setMsgs] = useState([]);

    useEffect(() => {
        const newSocket = io('http://localhost:8080');
        setSocket(newSocket);

        newSocket.on('message', msg => {

            console.log("messages are now before receiving", msgs);
            setMsgs(prevMsgs => [...prevMsgs, {text: msg, sentByCurrentUser: false}]);

            console.log("messages are now after receiving", msgs);
        });

        return () => newSocket.close();
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();

        if (socket) {
            socket.emit('message', msg);
            setMsgs(prevMsgs => [...prevMsgs, {text: msg, sentByCurrentUser: true}]);
            setMsg('');
        }


        console.log("messages are now after sending", msgs);
    }

    return (
        <div className="h-screen flex flex-col">
            <div className="msgs-container h-4/5 overflow-scroll">
                {
                    msgs.map((msg, index) => (
                            <div key={index} className={`msg m-5 ${msg.sentByCurrentUser ? 'text-right' : 'text-left'}`}> {msg.text}</div>
                        )
                    )
                }
            </div>
            <form onSubmit={sendMessage}>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div
                            className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                            <div className="relative flex-grow w-full">
                                <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)}
                                       className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300
                                       focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200
                                       text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                            <button
                                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Send
                            </button>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );
}

export default Chat;