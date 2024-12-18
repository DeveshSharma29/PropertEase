import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { handleSuccess, handleError } from '../utils';
import { useParams } from 'react-router-dom';
import Loading from '../Buying_page/Loading'

const Edit = () => {
    const { id } = useParams(); // Fetching listing ID from the URL params
    const [currentListing, setCurrentListing] = useState({
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        category: '',
    });

    const [listing, setListing] = useState(null); // State to store fetched listing
    const [error, setError] = useState(null); // To handle errors
    const [loading, setLoading] = useState(true); // To handle loading state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentListing({ ...currentListing, [name]: value });
    };

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/buy/${id}`);
            setListing(response.data.listing);
            setCurrentListing({
                location: response.data.listing.location || '',
                price: response.data.listing.price || '',
                bedrooms: response.data.listing.bedrooms || '',
                bathrooms: response.data.listing.bathrooms || '',
                area: response.data.listing.area || '',
                category: response.data.listing.category || '',
            });
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("called")
        try {
            const response = await axios.put(`http://localhost:9090/buy/${id}`, currentListing, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const { success, message, updated_listing } = response.data;
            if (success) {
                handleSuccess(message);
                setListing(updated_listing);
                setCurrentListing({
                    location: updated_listing.location,
                    price: updated_listing.price,
                    bedrooms: updated_listing.bedrooms,
                    bathrooms: updated_listing.bathrooms,
                    area: updated_listing.area,
                    category: updated_listing.category,
                });
            } else {
                handleError(message);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'Error updating details';
            handleError(errorMessage);
        }
    };

    if (loading) {
        return <div className='h-[100vh] w-[100vw] flex items-center justify-center'><Loading /></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mt-[4rem] mx-auto w-[80%] h-[32rem] bg-white rounded-xl overflow-hidden shadow-2xl flex justify-between">
            <div className="h-[100%] w-[50%] p-4">
                {listing?.images?.length > 0 ? (
                    <img src={listing.images[4]} alt="Listing" className="h-[100%] w-[100%] rounded-lg bg-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full">No Image Available</div>
                )}
            </div>

            <form
                onSubmit={handleSubmit}
                className="h-[100%] w-[50%] flex flex-col pl-[3rem] pt-2 gap-2"
            >
                <div className='flex h-[25%] items-center'>
                    <div className="flex flex-col h-[90%] w-[85%] justify-center gap-3">
                        <label htmlFor="location">Location</label>
                        <input
                            name="location"
                            type="text"
                            className="h-[2.5rem] w-[80%] bg-indigo-100 border-2 border-indigo-300 rounded-md pl-2 outline-none"
                            value={currentListing.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col h-[90%] w-[85%] justify-center gap-3">
                        <label htmlFor="price">Price</label>
                        <input
                            name="price"
                            type="text"
                            className="h-[2.5rem] w-[80%] bg-indigo-100 border-2 border-indigo-300 rounded-md pl-2 outline-none"
                            value={currentListing.price}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='flex h-[25%] items-center'>
                    <div className="flex flex-col h-[90%] w-[85%] justify-center gap-3">
                        <label htmlFor="bedrooms">Bedrooms</label>
                        <input
                            name="bedrooms"
                            type="number"
                            className="h-[2.5rem] w-[80%] bg-indigo-100 border-2 border-indigo-300 rounded-md pl-2 outline-none"
                            value={currentListing.bedrooms}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col h-[90%] w-[85%] justify-center gap-3">
                        <label htmlFor="bathrooms">Bathrooms</label>
                        <input
                            name="bathrooms"
                            type="number"
                            className="h-[2.5rem] w-[80%] bg-indigo-100 border-2 border-indigo-300 rounded-md pl-2 outline-none"
                            value={currentListing.bathrooms}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='flex h-[25%] items-center'>
                    <div className="flex flex-col h-[90%] w-[85%] justify-center gap-3">
                        <label htmlFor="area">Area (in sqft)</label>
                        <input
                            name="area"
                            type="text"
                            className="h-[2.5rem] w-[80%] bg-indigo-100 border-2 border-indigo-300 rounded-md pl-2 outline-none"
                            value={currentListing.area}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col h-[90%] w-[85%] justify-center gap-3">
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"
                            name="category"
                            className="bg-indigo-100 border-2 border-indigo-300 w-[80%] outline-none rounded-md p-2"
                            value={currentListing.category}
                            onChange={handleChange}
                        >
                            <option value="renting">Renting</option>
                            <option value="selling">Selling</option>
                        </select>
                    </div>
                </div>

                <button className="w-[10rem] h-[3rem] ml-[11rem] text-white rounded-lg bg-indigo-500 active:bg-indigo-700 mt-3" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
};

export default Edit;
