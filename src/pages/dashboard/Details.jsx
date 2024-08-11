import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import UserTable from '../../components/UserTable';
import { UserRoleContext } from '../../context/UserRoleContext';
function Details() {
  const { role: userRole } = useContext(UserRoleContext);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://helbackend.vercel.app/api/v1/users/getlist', {
          withCredentials: true,
        });

        
        setRole(userRole);
        console.log(response)
        console.log(userRole)
        
        if (userRole === 'Admin') {
          setTeachers(response.data.data.teachers || []);
          setStudents(response.data.data.students || []);
        } else if (userRole === 'Teacher' || userRole === 'Student') {
          setStudents(response.data.data || []);
        }

      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      }
    };

    fetchData();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">User List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Render teachers only if the user is an Admin */}
        {role === 'Admin' && teachers.length > 0 && (
          <UserTable title="Teachers" userRole={userRole} users={teachers} />
        )}
        {/* Render students list for all roles */}
        {students.length > 0 && (
          <UserTable title="Students" userRole={userRole} users={students} />
        )}
      </div>
    </div>
  );
}

export default Details;
