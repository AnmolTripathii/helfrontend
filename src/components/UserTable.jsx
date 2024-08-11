import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserTable({ title, users, userRole }) {
    const handleDelete = async (userId) => {
        try {
            const response = await axios.delete(`https://helbackend.vercel.app/api/v1/users/delete/${userId}`, {
                withCredentials: true,
            });

            console.log("User deleted successfully:", response.data.message);
            window.location.reload();
        } catch (err) {
            console.error("Failed to delete user:", err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-semibold text-center py-4 bg-gray-200">{title}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-center">#</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Role</th>
                            <th className="py-2 px-4 border-b">Class</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            {userRole !== 'Student' && (
                                <th className="py-2 px-4 border-b text-center">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="text-center">
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.role}</td>
                                <td className="py-2 px-4 border-b">{user.classroom_id?.name || 'N/A'}</td>
                                <td className="py-2 px-4 border-b">{user.email || 'N/A'}</td>
                                {userRole !== 'Student' && (
                                    <td className="py-2 px-4 border-b text-center">
                                        <Link to={`/update/${user._id}`}>
                                            <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                                        </Link>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserTable;
