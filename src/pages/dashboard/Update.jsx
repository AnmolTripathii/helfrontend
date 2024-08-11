import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
    classroom: '',
    confirmReassign: false
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://helbackend.vercel.app/api/v1/users/data/${id}`, {
          withCredentials: true,
        });
        setUser(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://helbackend.vercel.app/api/v1/users/update/${id}`, user, {
        withCredentials: true,
      });
      navigate('/dashboard/details');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-gray-900">
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
        <div className='w-full max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg'>
          <h2 className="text-3xl font-bold mb-8 text-center">Edit User</h2>
          <form onSubmit={handleSubmit} className="w-full">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="form-group mb-4">
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Role</label>
              <input
                type="text"
                value={user.role}
                className="mt-1 block w-full bg-gray-200 border border-gray-300 text-gray-700 rounded-md shadow-sm sm:text-sm h-12 px-4"
                disabled
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
                value={user.password}
                onChange={handleChange}
              />
            </div>


            <div className="form-group mb-4">
              <label htmlFor="classroom" className="block text-sm font-medium">Classroom</label>
              <input
                type="text"
                id="classroom"
                name="classroom"
                placeholder="Enter Classroom Name"
                className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
                value={user.classroom}
                onChange={handleChange}
              />
            </div>
            {user.role === 'Teacher' && (
              <>
                <div className="form-group mb-4">
                  <label htmlFor="confirmReassign" className="block text-sm font-medium">
                    <input
                      type="checkbox"
                      id="confirmReassign"
                      name="confirmReassign"
                      checked={user.confirmReassign}
                      onChange={(e) => setUser({ ...user, confirmReassign: e.target.checked })}
                      className="mr-2"
                    />
                    Confirm Reassign
                  </label>
                </div>
              </>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 h-12"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Update;
