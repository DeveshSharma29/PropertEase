import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { CiViewList } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

const Side_Bar = () => {
    const navigate = useNavigate();
    const [currTab, setCurrTab] = useState('');

    const handleLogout = () => {
        console.log(`User ${localStorage.getItem('loggedInUser')} successfully logged out`);
        localStorage.clear();
        navigate('/login');
    };

    const handleTabChange = (tab) => {
        setCurrTab(tab);
        navigate(tab); // Navigate to the selected tab's route
    };

    return (
        <div className='bg-[#26282B] h-[100vh] w-[18%] flex flex-col pt-10 justify-between sticky top-0'>
            <div className='flex flex-col h-[40%] gap-4 pl-4 text-2xl text-white'>
                <div
                    className={`h-[25%] w-[90%] rounded-lg border-b-2 pl-2 cursor-pointer flex`}
                    onClick={() => handleTabChange('/')}
                >
                    <IoHomeOutline className='mt-2' />
                    <p className={`h-[100%] w-[100%] ml-4 mt-1`}>
                        Home
                    </p>
                </div>

                <div
                    className={`h-[25%] w-[90%] border-b-2 pl-2 pt-3 rounded-lg cursor-pointer flex ${currTab === '/profile' ? 'bg-[#3f6db1a5]' : ''}`}
                    onClick={() => handleTabChange('/profile')}
                >
                    <CgProfile className='mt-1' />
                    <p className={`h-[100%] w-[100%]  ml-4 `}>
                        Profile
                    </p>
                </div>

                <div
                    className={`h-[25%] w-[90%] border-b-2 pl-2 pt-3 rounded-lg cursor-pointer flex ${currTab === '/myListings' ? 'bg-[#3f6db1a5]' : ''}`}
                    onClick={() => handleTabChange('/myListings')}
                >
                    <CiViewList className='mt-1' />
                    <p className={`h-[100%] w-[100%] transition-all ease-in-out duration-200 ml-4 ${currTab === '/myListings' ? '' : ''}`}>
                        My Listings
                    </p>
                </div>

                <div
                    className={`h-[25%] w-[90%] border-b-2 pl-2 pt-3 rounded-lg cursor-pointer flex ${currTab === '/myFavorites' ? 'bg-[#3f6db1a5]' : ''}`}
                    onClick={() => handleTabChange('/myFavorites')}
                >
                    <FaRegStar className='mt-1' />
                    <p className={`h-[100%] w-[100%] ml-4 ${currTab === '/myFavorites' ? '' : ''}`}>
                        My Favorites
                    </p>
                </div>
            </div>

            <div className='self-center w-[100%] h-16 flex justify-center' onClick={handleLogout}>
                <button className='text-white bg-red-700 w-[100%] h-[100%] flex justify-center items-center text-2xl hover:bg-red-800 transition-all duration-150'>
                    Log out
                </button>
            </div>
        </div>
    );
}

export default Side_Bar;
