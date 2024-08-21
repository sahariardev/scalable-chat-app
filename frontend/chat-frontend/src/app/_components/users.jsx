import React from "react";
import {useUserStore} from "@/app/zustand/useUserStore";

const Users = () => {
    const {users} = useUserStore()

    return (
        <div>
            {
                users.map((user, index) => (
                        <div key={user._id} className="rounded-2xl p-3 m-5 bg-green-200">
                            {user.username}
                        </div>
                    )
                )
            }
        </div>
    );
}

export default Users;