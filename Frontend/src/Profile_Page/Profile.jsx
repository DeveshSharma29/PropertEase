import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Profile = () => {
    const { user, getUserData, setUser } = useContext(StoreContext);
    const email = localStorage.getItem('user_email');
    const token = localStorage.getItem('token');

    const [selectedFile, setSelectedFile] = useState(null);
    const [userDetails, setUserDetails] = useState({
        username: '',
        contactNumber: ''
    })
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(selectedFile);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
        console.log(userDetails)
    }

    useEffect(() => {
        if (token) {
            getUserData(email);
        }
    }, [token]);


    const handleUpload = async () => {
        if (!selectedFile) {
            handleError("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('email', email);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }


        try {
            const response = await axios.post('http://localhost:9090/user/setPhoto', formData);

            if (response.data.success) {
                console.log(response.data.profilePhotoUrl);
                setUser(response.data.updatedUser)
                handleSuccess('profile photo updated');
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            handleError('Error uploading photo');
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.post(
                `http://localhost:9090/user/?email=${email}`,
                {
                    username: userDetails.username,
                    contactNumber: userDetails.contactNumber,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data.success) {
                setUser(response.data.user);
                handleSuccess(response.data.message || 'User details updated successfully');
            } else {
                handleError(response.data.message || 'Failed to update user details');
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'Error updating details';
            handleError(errorMessage);
        }
    };




    return (
        <div className='h-[100vh] flex-grow bg-gradient-to-t from-[#4a73a134] to-[#4a73a1d5]'>
            <div className='h-[50%] flex items-center pl-24'>
                <img className='h-[300px] w-[300px] rounded-full' src={user?.URL || '/profilePhoto.png'} />
                <div className="flex flex-col">
                    <label
                        htmlFor="file-upload"
                        className="bg-blue-500 text-white w-[10rem] h-[2rem] flex items-center justify-center rounded-lg ml-5 hover:bg-blue-600 cursor-pointer"
                    >
                        Choose File
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <button
                        className="bg-[#4A73A1] text-white w-[10rem] h-[2rem] rounded-lg ml-5 mt-3 hover:bg-[#3b5a82]"
                        onClick={() => handleUpload()}
                    >
                        Change photo
                    </button>
                </div>

            </div>

            <div className='h-[50%] w-[100%] flex items-center text-2xl pl-[7.5rem] font-semibold'>
                <div className='w-[50%] h-[80%] flex flex-col items-start justify-center'>
                    <div className='h-[25%] w-[40%]'>
                        <input className='w-[100%] bg-[#4a73a12d] border-2 border-[#4A73A1] rounded-lg outline-none h-[3.5rem] pt- pl-2 placeholder:text-gray-500' placeholder={user?.username || "Username not available"} name='username' onChange={handleChange}></input>
                    </div>
                    <div className='h-[25%] w-[40%]'>
                        <input className='w-[100%] bg-[#4a73a12d] border-2 border-[#4A73A1] outline-none h-[3.5rem] rounded-lg pt- pl-2  placeholder:text-gray-500' placeholder={user?.contactNumber || "Contact not available"} name='contactNumber' onChange={handleChange}></input>
                    </div>
                    <div className='h-[20%] w-[40%] flex items-center justify-center'>
                        <input className='w-[100%] bg-[#4a73a12d] border-2 border-[#4A73A1] outline-none h-[3.5rem] rounded-lg pt- pl-2  placeholder:text-gray-500' placeholder={user?.email || 0} disabled></input>
                    </div>
                    <button className='h-[3rem] w-[10rem] text-white rounded-lg bg-[#4A73A1] mt-[1rem]' onClick={handleUpdate}>Save</button>
                </div>

                <div className='w-[50%] h-[80%] flex flex-col items-start justify-start mt-3 gap-[1rem]'>
                    <div className='h-[20%] w-[40%] flex items-center justify-center'>
                        <input className='w-[100%] bg-[#4a73a12d] border-2 border-[#4A73A1] outline-none h-[3.5rem] rounded-lg pt- pl-2  placeholder:text-gray-500' placeholder={`My Listings : ${user?.listings?.length}` || 0} disabled></input>
                    </div>
                    <div className='h-[20%] w-[40%] flex items-center justify-center'>
                        <input className='w-[100%] bg-[#4a73a12d] border-2 border-[#4A73A1] outline-none h-[3.5rem] rounded-lg pt- pl-2  placeholder:text-gray-500' placeholder={`My favorites : ${user?.favorites?.length}` || 0} disabled></input>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
