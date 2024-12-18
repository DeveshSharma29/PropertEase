import React from 'react';
import NavBar from '../LandingPage/NavBar';
import MortgageCalculator from './MortgageCalculator';
import { ToastContainer } from 'react-toastify';

const MortgagePage = () => {
    return (
        <div className='bg-[url(/bg-buy.jpg)] bg-center bg-repeat bg-cover bg-fixed h-[100vh]'>
            <NavBar />
            <MortgageCalculator />
            <ToastContainer />
        </div>
    )
}

export default MortgagePage
