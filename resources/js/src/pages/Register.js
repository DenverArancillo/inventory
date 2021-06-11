import React, { useState, useRef } from 'react';
import Cookies from '../components/Cookies';
import { useHistory } from 'react-router-dom';

import fetchApi from '../utils/fetchApi';

const Register = () => {
    const [registerErrorMessage, setStateregisterErrorMessage] = useState('');

    const history = useHistory();

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    if (Cookies.get('access_token')) {
        history.push('/');
    }

    const submitRegister = async event => {
        event.preventDefault();

        let firstname = firstnameRef.current.value;
        let lastname = lastnameRef.current.value;
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        let passwordConfirmation = passwordConfirmationRef.current.value;

        if (
            firstname === '' ||
            lastname === '' ||
            email === '' || 
            password === '' ||
            passwordConfirmation === ''
        ) {
            setStateregisterErrorMessage('Please provide a value for required fields.');
            return;
        }
        
        // check if password and password confirmation is match
        if (passwordConfirmation !== password) {
            setStateregisterErrorMessage('Password does not match.');
            return;
        }

        let response = await fetchApi('post', '/api/register', { 
            first_name: firstname,
            last_name: lastname,
            email, 
            password,
            password_confirmation: passwordConfirmation
        });

        if (response.errors) {
            // response for email is already taken
            if (response.errors.email) {
                setStateregisterErrorMessage(response.errors.email[0]);
                return;
            }
        }

        if (response.status) {
            let d = new Date();
            let expires = 60 * 2;
            d.setTime(d.getTime() + (expires*60*1000));
            Cookies.set("access_token", response.data.token, { path: "/", expires: d, sameSite: "lax" });
            window.location = '/';
        } else {
            setStateregisterErrorMessage('');
        }
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 grid place-items-center">

            <div className="bg-white max-w-lg lg:w-2/3 rounded shadow-2xl mx-auto my-10 p-8 md:p-16">
                <h3 className="font-bold text-2xl">Register an account</h3>

                <div className="mt-2">
                    <div className={`text-sm text-red-500 mb-2 ${!registerErrorMessage ? 'hidden': ''}`}>{registerErrorMessage}</div>
                    <form className="flex flex-col" onSubmit={submitRegister}>
                        <div className="mb-2 pt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="firstname">First Name</label>
                            <input required ref={firstnameRef} type="text" id="firstname" className="bg-gray-200 rounded w-full text-gray-700 border-2 focus:outline-none focus:border-blue-400 transition duration-500 p-3"/>
                        </div>
                        <div className="mb-2 pt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="lastname">Last Name</label>
                            <input required ref={lastnameRef} type="text" id="lastname" className="bg-gray-200 rounded w-full text-gray-700 border-2 focus:outline-none focus:border-blue-400 transition duration-500 p-3"/>
                        </div>
                        <div className="mb-2 pt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">Email</label>
                            <input required ref={emailRef} type="email" id="email" className="bg-gray-200 rounded w-full text-gray-700 border-2 focus:outline-none focus:border-blue-400 transition duration-500 p-3"/>
                        </div>
                        <div className="mb-2 pt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Password</label>
                            <input required ref={passwordRef} type="password" id="password" className="bg-gray-200 rounded w-full text-gray-700 border-2 focus:outline-none focus:border-blue-400 transition duration-500 p-3"/>
                        </div>
                        <div className="mb-7 pt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="passwordconfirmation">Confirm Password</label>
                            <input required ref={passwordConfirmationRef} type="password" id="passwordconfirmation" className="bg-gray-200 rounded w-full text-gray-700 border-2 focus:outline-none focus:border-blue-400 transition duration-500 p-3"/>
                        </div>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Register</button>
                        <a href="/login" className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 hover:underline mt-4">Log in with an account</a>
                    </form>

                </div>

            </div>
        </div>
    );
}

export default Register;