import React, { useState, useRef } from 'react';
import Cookies from '../components/Cookies';
import { useHistory } from 'react-router-dom';

import fetchApi from '../utils/fetchApi';

const Login = () => {
    const [loginErrorMessage, setStateloginErrorMessage] = useState('');

    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();

    if (Cookies.get('access_token')) {
        history.push('/');
    }

    const login = async event => {
        event.preventDefault();
        let email = emailRef.current.value;
        let password = passwordRef.current.value;

        if (email === '' || password === '') {
            setStateloginErrorMessage('Please provide an email or password.');
            return;
        }

        await fetchApi('get', '/sanctum/csrf-cookie');
        let response = await fetchApi('post', '/api/login', { email, password });
        
        if (response.status) {

            let d = new Date();
            let expires = 60 * 2;
            d.setTime(d.getTime() + (expires*60*1000));
            Cookies.set("access_token", response.data.token, { path: "/", expires: d, sameSite: "lax" });
            window.location = '/';

        } else {
            setStateloginErrorMessage('Email or password is incorrect.');
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 grid place-items-center">

            <div className="bg-white max-w-lg lg:w-2/3 rounded shadow-2xl mx-auto p-8 md:p-16">
                <h3 className="font-bold text-2xl">Welcome to Inventory</h3>
                <p className="text-gray-600 pt-2">Sign in to your account.</p>

                <div className="mt-10">
                    <div className={`text-sm text-red-500 mb-2 ${!loginErrorMessage ? 'hidden': ''}`}>{loginErrorMessage}</div>
                    <form className="flex flex-col" onSubmit={login}>
                        <div className="mb-6 pt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">Email</label>
                            <input required ref={emailRef} type="email" id="email" className="bg-gray-200 rounded w-full text-gray-700 border-2 focus:outline-none focus:border-blue-400 transition duration-500 p-3"/>
                        </div>
                        <div className="mb-7 pt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Password</label>
                            <input required ref={passwordRef} type="password" id="password" className="bg-gray-200 rounded w-full text-gray-700 border-2 focus:outline-none focus:border-blue-400 transition duration-500 p-3"/>
                        </div>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Log In</button>
                        <div className="flex items-center justify-between">
                            <a href="/register" className="text-sm sm:text-xs text-purple-600 hover:text-purple-700 hover:underline mt-4">Register an account</a>
                            <a href="#" className="text-sm sm:text-xs text-purple-600 hover:text-purple-700 hover:underline mt-4">Forgot your password?</a>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    );
}

export default Login;