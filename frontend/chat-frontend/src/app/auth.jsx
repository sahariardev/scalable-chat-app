'use client'

import React, {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useAuthStore} from './zustand/useAuthStore'

const Auth = () => {

    const router = useRouter();
    const rootUrl = 'http://localhost:5000'
    const signupUrl = rootUrl + '/' + 'auth/signup'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {updateAuthName} = useAuthStore();

    const signUp = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(signupUrl, {
                username: username,
                password: password
            }, {
                withCredentials: true
            });

            if (res.data?.message === 'Username already exists') {
                alert('Username already exists')
            } else {
                updateAuthName(username);
                router.replace('/chat');
            }

        } catch (e) {
            console.log('Something went wrong', e);
        }
    }

    const login = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(signupUrl, {
                username: username,
                password: password
            }, {
                withCredentials: true
            });

            if (res.data?.message === 'Auth failed!') {
                alert('auth pailed')
            } else {
                updateAuthName(username);
                router.replace('/chat');
            }

        } catch (e) {
            console.log('Something went wrong', e);
        }
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login / Sign Up to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="Username"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        Username</label>
                                    <input type="text" name="Username" id="Username"
                                           value={username}
                                           onChange={(e) => setUsername(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="name@company.com" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           id="password" placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required=""/>
                                </div>

                                <div className="flex flow-row justify-between">
                                    <button type="button"
                                            onClick={(e) => {
                                                login(e);
                                            }}
                                            className="w-1/3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login
                                    </button>
                                    <button type="button"
                                            onClick={(e) => {
                                                signUp(e);
                                            }}
                                            className="w-1/3 right-0 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                                        up
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Auth;