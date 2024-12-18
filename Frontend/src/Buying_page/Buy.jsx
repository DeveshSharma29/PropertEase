import React from 'react';
import Filters from './Filters';
import PostList from './PostList';
import NavBar from '../LandingPage/NavBar';
import styles from './Buy.module.css';

const Buy = () => {
    return (
        <div className={styles.background}>
            <NavBar />
            <div className={styles.container}>
                <Filters />
                <PostList />
            </div>
        </div>
    );
};

export default Buy;
