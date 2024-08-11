// import React, { useContext } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import Navbar from '../../components/Navbar';
// import { UserContext } from '../../context/UserContext';

// function Dashboard() {
//   const { user, loading, error } = useContext(UserContext);

//   if (loading) return <p>Loading...</p>;
//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="bg-red-600 text-white flex flex-col gap-4 items-center justify-center font-bold py-4 px-6 rounded-lg shadow-lg text-center">
//           Error: {error}
//           <Link to={"/login"}><button className=' py-2 px-4 rounded-md  bg-red-600 shadow-md shadow-black '>Login</button></Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar user={user} />
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold text-center mb-8">Dashboard</h1>
//         <p className="text-center text-lg mb-8">Welcome, {user?.name || user?.email}</p>

//         {/* Box Container */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {user?.role === 'Admin' && (
//             <div className="flex flex-col items-center justify-center p-6 border border-gray-300 bg-gray-300 rounded-lg shadow-lg">
//               <Link to={"/dashboard/classroom"}>
//                 <button className="w-full py-2 px-6 border-2 border-gray-700 shadow-sm shadow-black rounded-md">Create Classroom</button>
//               </Link>
//             </div>
//           )}
//           {(user?.role === 'Admin' || user?.role === 'Teacher') && (
//             <div className="flex flex-col items-center justify-center p-6 border border-gray-300 bg-gray-300 rounded-lg shadow-lg">
//               <Link to={"/dashboard/register"}>
//                 <button className="w-full py-2 px-6 border-2 border-gray-700 shadow-sm shadow-black rounded-md">Register</button>
//               </Link>
//             </div>
//           )}
//           <div className="flex flex-col items-center justify-center p-6 border border-gray-300 bg-gray-300 rounded-lg shadow-lg">
//             <Link to={"/dashboard/details"}>
//               <button className="w-full py-2 px-6 border-2 border-gray-700 shadow-sm shadow-black rounded-md">View List</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//       <Outlet />
//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { UserRoleContext } from '../../context/UserRoleContext';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { setRole } = useContext(UserRoleContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://helbackend.vercel.app/api/v1/users/getuser', {
          withCredentials: true,
        });
        setUser(response.data.data);
        setRole(response.data.data.role); 
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchUser();
  }, [setRole]);


  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-600 text-white flex flex-col gap-4 items-center justify-center font-bold py-4 px-6 rounded-lg shadow-lg text-center">
          Error: {error}
          <Link to={"/login"}><button className=' py-2 px-4 rounded-md  bg-red-600 shadow-md shadow-black '>Login</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar user={user} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-8">Dashboard</h1>
        <p className="text-center text-lg mb-8">Welcome, {user?.name || user?.email}</p>

        {/* Box Container */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {user?.role === 'Admin' && (
            <div className="flex flex-col items-center justify-center p-6 border border-gray-300 bg-gray-300 rounded-lg shadow-lg">
              <Link to={"/dashboard/classroom"}>
                <button className="w-full py-2 px-6 border-2 border-gray-700 shadow-sm shadow-black rounded-md">Create Classroom</button>
              </Link>
            </div>
          )}
          {(user?.role === 'Admin' || user?.role === 'Teacher') && (
            <div className="flex flex-col items-center justify-center p-6 border border-gray-300 bg-gray-300 rounded-lg shadow-lg">
              <Link to={"/dashboard/register"}>
                <button className="w-full py-2 px-6 border-2 border-gray-700 shadow-sm shadow-black rounded-md">Register</button>
              </Link>
            </div>
          )}
          <div className="flex flex-col items-center justify-center p-6 border border-gray-300 bg-gray-300 rounded-lg shadow-lg">
            <Link to={"/dashboard/details"}>
              <button className="w-full py-2 px-6 border-2 border-gray-700 shadow-sm shadow-black rounded-md">View List</button>
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
