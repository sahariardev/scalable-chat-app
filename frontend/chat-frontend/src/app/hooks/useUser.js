'use client'
import { useState, useEffect } from 'react';
import base64 from "base-64";

const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt='));
        //console.log("token is", cookies.get('jwt'));
        if (token) {
            const decoded = base64(token.split(".")[1]);
            setUser(decoded);
        }
    }, []);

    return user;
};

export default useUser;