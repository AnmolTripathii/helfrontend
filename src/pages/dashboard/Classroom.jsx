import React, { useState } from 'react';
import axios from 'axios';

const Classroom = () => {
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [daysInSession, setDaysInSession] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://helbackend.vercel.app/api/v1/users/createclassroom', {
                name,
                start_time: startTime,
                end_time: endTime,
                days_in_session: daysInSession
            }, {
                withCredentials: true
            });

            setSuccess('Classroom created successfully');
            setTimeout(() => setSuccess(''), 5000);
            // Clear form
            setName('');
            setStartTime('');
            setEndTime('');
            setDaysInSession([]);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-800 text-gray-900">
            <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
                <div className='w-full max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg shadow-black flex flex-col items-center justify-center'>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Create Classroom</h2>
                    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                        <div className="form-group mb-4">
                            <label htmlFor="name" className="block text-sm font-medium">Classroom Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder='Enter Classroom Name'
                                className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="startTime" className="block text-sm font-medium">Start Time (HH:MM)</label>
                            <input
                                type="time"
                                id="startTime"
                                className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="endTime" className="block text-sm font-medium">End Time (HH:MM)</label>
                            <input
                                type="time"
                                id="endTime"
                                className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="daysInSession" className="block text-sm font-medium">Days in Session</label>
                            <input
                                type="text"
                                id="daysInSession"
                                placeholder='Enter days (e.g., Monday, Wednesday)'
                                className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
                                value={daysInSession}
                                onChange={(e) => setDaysInSession(e.target.value.split(','))}
                                required
                            />
                        </div>
                        {error && (
                            <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg">
                                {success}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 h-12"
                        >
                            Create Classroom
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Classroom;
