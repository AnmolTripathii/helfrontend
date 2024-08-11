
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserRoleContext } from '../../context/UserRoleContext';

const Register = () => {
  const { role: userRole } = useContext(UserRoleContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [classroom, setClassroom] = useState('');
  const [confirmReassign, setConfirmReassign] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://helbackend.vercel.app/api/v1/users/register', { 
        name, 
        email, 
        password, 
        role, 
        classroom,
        confirmReassign 
      }, {
        withCredentials: true
    });

      console.log(response.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);

      setName('');
      setEmail('');
      setPassword('');
      setRole('');
      setClassroom('');
      setConfirmReassign(false);

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-gray-900 ">
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
        <div className='w-full max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg shadow-black flex flex-col items-center justify-center'>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Register</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="form-group mb-4">
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name"
                className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                {userRole === 'Admin' && (
                  <option value="Teacher">Teacher</option>
                )}
                <option value="Student">Student</option>
              </select>
            </div>
            
                <div className="form-group mb-4">
                  <label htmlFor="classroom" className="block text-sm font-medium">Classroom</label>
                  <input
                    type="text"
                    id="classroom"
                    placeholder="Enter Classroom Name"
                    className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
                    value={classroom}
                    onChange={(e) => setClassroom(e.target.value)}
                  />
                </div>
                {role === 'Teacher' && (
              <>
                <div className="form-group mb-4">
                  <label htmlFor="confirmReassign" className="block text-sm font-medium">Confirm Reassign (If the classroom already has a teacher would like to reassign )</label>
                  <input
                    type="checkbox"
                    id="confirmReassign"
                    className="mt-1 block"
                    checked={confirmReassign}
                    onChange={(e) => setConfirmReassign(e.target.checked)}
                  />
                </div>
              </>
            )}
            <div className="form-group mb-4">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                className="mt-1 block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {success && (
              <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg">
                User registered successfully!
              </div>
            )}
            {error && (
              <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 h-12"
            >
              Register
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
