import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ user }) => {
    const navigate = useNavigate();

    // const handleLogout = async () => {
    //     try {
    //         const response=await axios.post('http://localhost:8000/api/v1/users/logout', {
    //             withCredentials: true
    //           });
    //           console.log(response.data.message)
    //         localStorage.removeItem('accessToken');
    //         navigate('/');
    //     } catch (error) {
    //         console.error('Error during logout:', error);
    //     }
    // };
    const handleLogout = async () => {
        try {
            const response = await axios.post('https://helbackend.vercel.app/api/v1/users/logout', {}, {
                withCredentials: true
            });
            console.log(response.data.message);  
            localStorage.removeItem('accessToken');
            navigate('/');
        } catch (error) {
           
            if (error.response) {
                console.error('Error during logout:', error.response.data);
            } else if (error.request) {
                console.error('No response from server:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };
    

    return (
        <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <a href="#" className="text-xl font-bold mb-4 md:mb-0">School Management</a>
                <div className="flex items-center">
                    <span className="mr-4">Welcome, {user?.name || user?.email}</span>
                    <button onClick={handleLogout} className="w-full md:w-auto bg-slate-100 text-black py-2 px-4 rounded-md shadow-sm hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
