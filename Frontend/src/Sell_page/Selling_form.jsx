import React, { useState, useContext, useEffect } from 'react';
import styles from './Selling_form.module.css';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { handleError, handleSuccess } from '../utils';
import { useNavigate, Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import Loading from '../Buying_page/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Selling_form = () => {
    const [formData, setFormData] = useState({
        images: [],
        location: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        price: '',
        category: 'selling'
    });


    const navigate = useNavigate();
    const { setData, setLoading, loading } = useContext(StoreContext);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setFormData({ ...formData, [name]: files }); // For file input
        } else {
            setFormData({ ...formData, [name]: value }); // For text/number input
        }
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { location, bedrooms, bathrooms, area, price, images, category } = formData;
        setLoading(true);
        const token = localStorage.getItem('token');
        const user_email = localStorage.getItem('user_email');

        if (!token) {
            handleError("Please login to sell your estate");
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            setLoading(false);
            return;
        }

        if (location === '' || bedrooms === '' || bathrooms === '' || area === '' || price === '' || images.length === 0) {
            handleError("Please fill out all required fields."); // Trigger toast
            setLoading(false);
            return; // Exit early
        }

        const formDataObj = new FormData();
        formDataObj.append('location', location);
        formDataObj.append('bedrooms', parseInt(bedrooms, 10)); // Convert to integer
        formDataObj.append('bathrooms', parseInt(bathrooms, 10)); // Convert to integer
        formDataObj.append('area', parseInt(area, 10)); // Convert to integer
        formDataObj.append('price', parseInt(price, 10)); // Convert to integer
        formDataObj.append('token', token);
        formDataObj.append('user_email', user_email);
        formDataObj.append('category', category);

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formDataObj.append('images', images[i]);
            }
        }

        try {
            const URL = "http://localhost:9090/sell";
            const response = await axios.post(URL, formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log("API response:", response.data); // Debugging line

            const { success, updatedListings } = response.data;

            if (success) {
                setData(updatedListings);
                handleSuccess("Your property has been listed"); // Show success toast
                navigate('/buy');
            } else {
                handleError("Failed to add listing"); // Show error toast
            }
        } catch (err) {
            console.error("Submit error:", err.response || err); // More detailed error log
            handleError("Failed to add listing"); // Show error toast
        } finally {
            setLoading(false); // Ensure loading state is reset
        }
    };



    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className='flex flex-col gap-8 justify-center items-center'>
                    <h2>Please wait while we process your request.</h2>
                    <Loading />
                </div>
            </div>
        );
    }

    return (
        <div className='w-[80%] h-[75vh] bg-white flex mx-auto mt-[3rem] rounded-2xl shadow-2xl overflow-hidden items-center'>
            <div className='h-[100%] w-[50%]'>
                <img src="/buy.png" alt="buy" />
            </div>
            <div className='h-[100%] w-[50%] px-14 pt-4'>
                <div className={styles.heading_div}>
                    <h1 className={styles.heading}>List your Property</h1>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="location">Location*</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="location"
                            placeholder="Enter location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="bedrooms">Bedrooms*</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="bedrooms"
                                placeholder="Enter number of bedrooms"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="bathrooms">Bathrooms*</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="bathrooms"
                                placeholder="Enter number of bathrooms"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="area">Area (sqft)*</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="area"
                                placeholder="Enter area"
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="price">Price*</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="price"
                                placeholder="Enter price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between mb-[15px] text-[#4A73A1]'>
                        <label htmlFor="category">Category :</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="bg-[#4a73a12d] border-2 border-[#4A73A1] w-[81.5%] px-[10px] py-[12px] outline-none rounded-lg"
                        >
                            <option value="selling">Selling</option>
                            <option value="renting">Renting</option>
                        </select>
                    </div>


                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="images">Property Images*</label>
                        <input
                            className={`${styles.input} ${styles.anotherClass}`}
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </div>


                    <button type="submit" className={styles.button}>Submit</button>
                </form>
            </div >
            <ToastContainer /> {/* Toast container to display toasts */}
        </div>
    );
};

export default Selling_form;
