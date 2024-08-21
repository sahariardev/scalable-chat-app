'use client'

import React, {useEffect, useState} from "react";
import io from 'socket.io-client';

const Chat = () => {

    const [msg, setMsg] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:8080');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();

        if(socket) {
            socket.emit('message', msg);
            setMsg('');
        }
    }
    
    return (
        <div>
            <form onSubmit={sendMessage}>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto max-w-xl">
                        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                            <div className="relative flex-grow w-full">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Message</label>
                                <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)}
                                       className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300
                                       focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200
                                       text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Send</button>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );
}

export default Chat;