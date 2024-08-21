import React from "react";
import {useUserStore} from "@/app/zustand/useUserStore";
import {useChatReceiverStore} from "@/app/zustand/useChatReceiverStore";

const Users = () => {
    const {users} = useUserStore()
    const {setReceiver} = useChatReceiverStore();


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