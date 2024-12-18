import React, { useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from "../context/StoreContext";
import { handleSuccess, handleError } from '../utils';

const Email = () => {

    const [emailDetails, setEmailDetails] = useState({
        subject: '',
        text: ''
    })
    const { userEmail } = useContext(StoreContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailDetails({ ...emailDetails, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9090/contact/sendEmail', {
                to: userEmail,
                subject: emailDetails.subject,
                text: emailDetails.text
            })
            const { success, message } = response.data;
            if (success) {
                handleSuccess(message);
                // Clear form after success
                setEmailDetails({ subject: '', text: '' });
            } else {
                handleError(message);
            }
        } catch (error) {
            handleError("failed to send email");
        }
    }

    return (
        <div className='flex w-[80%] mx-auto mt-[3.5rem]'>
            <div className='w-[50%]'>
                <img src="/mail.png" alt="" />
            </div>
            <form className='w-[50%] h-[33rem] flex flex-col' onSubmit={handleSubmit}>

                <p className='font-semibold text-2xl'>To : {userEmail}</p>
                <div className='w-[95%] h-[20%] flex flex-col gap-3'>
                    <label htmlFor="">What it's about</label>
                    <input
                        type="text"
                        className='w-[90%] h-[3rem] bg-[#4a73a12d] border-2 border-[#4A73A1] placeholder:text-[#4A73A1] rounded-lg outline-none pl-3'
                        name='subject'
                        onChange={handleChange}
                        placeholder='subject'
                        value={emailDetails.subject} // Controlled input
                    />
                </div>
                <div className='w-[95%] h-[47%] mt-1 flex flex-col gap-3'>
                    <label htmlFor="">Enter Message</label>
                    <textarea
                        id=""
                        className='h-[75%] w-[90%] bg-[#4a73a12d] border-2 border-[#4A73A1] placeholder:text-[#4A73A1] rounded-lg resize-none outline-none pl-3 pt-2'
                        name='text'
                        onChange={handleChange}
                        placeholder='message'
                        value={emailDetails.text} // Controlled input
                    ></textarea>
                </div>

                <button type='submit' className='h-[3rem] w-[10rem] rounded-md text-white bg-[#4A73A1] active:bg-[#2e4764] '>Send</button>

            </form>
        </div>
    )
}

export default Email;
