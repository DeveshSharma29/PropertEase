import React from 'react';
import Email from './Email';
import NavBar from '../LandingPage/NavBar';
import { ToastContainer } from 'react-toastify';

const Email_Page = () => {
    return (
        <div className='bg-[url(/bg-buy.jpg)] bg-center bg-repeat bg-cover bg-fixed h-[100vh]'>
            <NavBar />
            <Email />
            <ToastContainer />
        </div>
    )
}

export default Email_Page
