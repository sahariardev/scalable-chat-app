import React, {useEffect} from "react";
import {useUserStore} from "@/app/zustand/useUserStore";
import {useChatReceiverStore} from "@/app/zustand/useChatReceiverStore";
import {useChatMessagesStore} from "@/app/zustand/useChatMessagesStore";
import axios from "axios";
import {useAuthStore} from "@/app/zustand/useAuthStore";

const Users = () => {
    const {users} = useUserStore();
    const {authName} = useAuthStore();
    const {receiver, setReceiver} = useChatReceiverStore();
    const {updateChatMsgs} = useChatMessagesStore();
    const rootUrl = 'http://localhost:5000'
    const messagesUrl = rootUrl + '/' + 'messages'

    useEffect(() => {
        const getMessages = async () => {
            const res = await axios.get(rootUrl + messagesUrl, {
                params: {
                    'sender': authName,
                    'receiver': receiver
                }
            }, {
                withCredentials: true,
            });

            if (res.data.length != 0) {
                updateChatMsgs(res.data);
            } else {
                updateChatMsgs([]);
            }
        }

        if (receiver) {
            getMessages();
        }

    }, [receiver]);

    return (
        <div>
            {
                users.map((user, index) => (
                        <div key={user._id} className="rounded-2xl p-3 m-5 bg-green-200 cursor-pointer"
                             onClick={(e) => setReceiver(user)}>
                            {user.username}
                        </div>
                    )
                )
            }
        </div>
    );
}

export default Users;