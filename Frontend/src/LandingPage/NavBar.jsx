import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
    const token = localStorage.getItem('token'); // Check for token in localStorage
    const navigate = useNavigate();
    const location = useLocation();
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

    const handleRoutes = (path) => {
        navigate(path);
    }

    const handleLogout = () => {
        console.log(`User ${localStorage.getItem('loggedInUser')} successfully logged out`);
        localStorage.clear();
        navigate('/login');
    };

    const handleMenu = () => {
        setIsProfilePopupOpen(!isProfilePopupOpen);
    }

    // Check if current path is not '/'
    const backgroundClass = location.pathname === '/' ? '' : styles.bgBlue;

    return (
        <div className={`${styles.navbar} ${backgroundClass}`}>
            {/* Container for image and list */}
            <div className={styles.container}>
                {/* Image container */}
                <div className={styles.logo_container}>
                    <div className={styles.logo} onClick={() => navigate('/')}>
                        {/* <img src='/logo.png' onClick={() => navigate('/')}></img> */}
                        <p>PropertEase</p>
                    </div>
                </div>

                {/* List container */}
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to='/buy' className={styles.navLink}>Buy</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to='/sell' className={styles.navLink}>Sell</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to='/mortgage-calculator' className={styles.navLink}>Calculate Mortgage</Link>
                    </li>
                </ul>
            </div>

            {/* Second inner div with Profile/Log In button */}
            <div className={styles.rightContainer}>
                {token ? (
                    <>
                        <span className={styles.aboutUs} onClick={handleMenu}>Hi , {localStorage.getItem('loggedInUser')}</span>
                    </>
                ) : (
                    <button type="button" className={styles.LogOutBtn} onClick={() => navigate('/login')}>
                        Log In
                    </button>
                )}
            </div>
            {isProfilePopupOpen && (
                <div className="absolute top-[80%] right-10 w-[230px] bg-[#FFFFFF] opacity-95 shadow-lg rounded-lg p-4 z-50 text-black">
                    <div className="flex flex-col space-y-3 text-[1.1rem]">
                        <span className="text-center cursor-pointer rounded-md pl-2 p-2 hover:bg-gray-300" onClick={() => { handleRoutes('/profile') }}>Profile</span>
                        <span className="text-center cursor-pointer rounded-md pl-2 p-2 hover:bg-gray-300" onClick={() => { handleRoutes('/myListings') }}>My Listings</span>
                        <span className="text-center cursor-pointer rounded-md pl-2 p-2 hover:bg-gray-300" onClick={() => { handleRoutes('/myFavorites') }}>My Favourites</span>
                        <span className="text-center cursor-pointer rounded-md pl-2 p-2 hover:bg-gray-300 hover:text-red-600" onClick={handleLogout}>Logout</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
