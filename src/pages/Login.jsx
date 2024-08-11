import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://helbackend.vercel.app/api/v1/users/login',
        { email, password, role },
        { withCredentials: true }  
    );
    
    
    const { accessToken } = response.data;
    console.log(accessToken);
    localStorage.setItem('accessToken', accessToken);
    console.log(response.data);

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setTimeout(() => setError(''), 5000); 
    }
  };

  return (
    <div className="min-h-screen flex flex-colbg-white text-gray-900">
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
        <div className='w-full max-w-md mx-auto  bg-gray-800 text-white  p-6 rounded-lg shadow-md flex flex-col items-center justify-center'>
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <div className="form-group mb-4">
            <label htmlFor="role" className="block text-sm font-medium">Role</label>
            <select
              id="role"
              className="mt-1 block w-full bg-white border border-gray-500 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-sm font-medium ">Email</label>
            <input
              type="email"
              id="email"
              placeholder='Enter Your Email'
              className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="block text-sm font-medium ">Password</label>
            <input
              type="password"
              id="password"
              placeholder='Enter Your Password'
              className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 h-12"
          >
            Login
          </button>
        </form>
        </div>
      </main>

    </div>
  );
};

export default Login;
