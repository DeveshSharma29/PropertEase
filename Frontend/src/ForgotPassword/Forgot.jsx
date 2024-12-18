import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { handleSuccess, handleError } from '../utils';

const Forgot = () => {

    const [email, setEmail] = useState('');

    // Correct handleChange function
    const handleChange = (e) => {
        const { value } = e.target;
        setEmail(value);
        console.log(value);
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        setEmail('');
        try {
            const response = await axios.post(
                'http://localhost:9090/password/forgot',
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const { success, message } = response.data;
            if (success) {
                handleSuccess(message);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
            handleError('failed to send email');
        }
    }

    return (
        <div className="mx-auto w-[35rem] px-4 py-8 sm:px-6 lg:px-8 mt-12 mb-0">
            <div className="relative max-w-lg mx-auto bg-white bg-opacity-80 rounded-lg">
                <div className="absolute inset-0 bg-white rounded-lg"></div>
                <div className="relative z-10 p-6">

                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Forgot Password</h1>

                    <form onSubmit={sendEmail} className="mb-0 mt-4 space-y-4 rounded-lg shadow-lg sm:p-4 lg:p-6">
                        <p className="text-center text-lg font-medium">enter password reset email</p>

                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>

                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-lg border-2 border-gray-200 p-3 pe-12 text-sm shadow-md outline-gray-300"
                                    placeholder="Enter email"
                                    name="email"
                                    onChange={handleChange}
                                    value={email}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
                        >
                            Send
                        </button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Forgot;
