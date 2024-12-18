import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { handleSuccess, handleError } from '../utils';
import { MdModeEdit } from "react-icons/md";

const Listing = ({ id, url, location, bedrooms, bathrooms, area, price, category }) => {
    const { setMyListings, currentListing, setCurrentListing } = useContext(StoreContext);
    const navigate = useNavigate();
    const handleOnEditClick = () => {
        setCurrentListing({
            id,
            url,
            location,
            bedrooms,
            bathrooms,
            area,
            price,
            category
        });
        navigate(`/update/${id}`)
    };

    const handleDeleteListing = async () => {
        try {
            const email = localStorage.getItem('user_email');
            const URL = `http://localhost:9090/buy/${id}`;
            const response = await axios.delete(URL, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    email: email  // Send email in the request body
                }
            });
            console.log(response.data.updatedListings);
            // Update listings in the context
            setMyListings(response.data.updatedListings);
            handleSuccess('listing deleted successfully');
        } catch (err) {
            handleError('failed to delete listing');
            console.log("Error deleting listing", err);
        }
    };

    return (
        <div className="flex w-[90%] h-[250px] rounded overflow-hidden shadow-lg hover:shadow-xl cursor-pointer justify-between relative bg-white">

            <img className="h-[250px] w-[450px] object-cover" src={url} alt="Property Image" loading='lazy' />

            <div className="px-6 py-4 bg-white flex flex-col justify-evenly w-[50%]">
                <div className='flex justify-between items-center'>
                    <h2 className="text-[50px] font-bold text-blue-800">{location}</h2>
                    {category == 'selling' ? <p className="text-[35px] font-extrabold text-blue-800">{`${price} $ `}</p> : <p className="text-[35px] font-extrabold text-blue-800">{`${price} $ P/M`}</p>}
                </div>

                <div className="flex justify-between gap-10 ">
                    <div className="flex items-center justify-start">
                        <img src="https://img.icons8.com/windows/24/null/bedroom.png" />
                        <p className="mt-3 ml-2 text-lg font-medium text-gray-800">{`${bedrooms} bedrooms`}</p>
                    </div>
                    <div className="flex items-center">
                        <img src="https://img.icons8.com/pastel-glyph/24/null/bath--v2.png" />
                        <p className="mt-3 ml-2 text-lg font-medium text-gray-800">{`${bathrooms} bathrooms`}</p>
                    </div>
                    <div className="flex items-center">
                        <img src="https://img.icons8.com/ios-glyphs/24/null/expand--v1.png" />
                        <p className="mt-3 ml-2 text-lg font-medium text-gray-800">{`${area} sq m`}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-14 border-l-2 border-gray-200 h-[80%] justify-center items-center gap-[5rem] self-center">
                <MdModeEdit
                    className='h-[2.5rem] w-[2.5rem] rounded-full bg-blue-400 text-white shadow-md hover:scale-110 transition-transform duration-200 text-[0.3rem] p-2' onClick={handleOnEditClick}
                />
                <img className='h-15 hover:scale-110 duration-200' src='delete-button.png' onClick={handleDeleteListing} alt="Delete Listing" />
            </div>
        </div>

    );
};

export default Listing;
