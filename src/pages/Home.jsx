import React from 'react';
import IMG from '../assets/IMG.png';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">Classroom Management</h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Manage classrooms, teachers, and students with ease.
          </p>
        </section>

        

        <section className="w-full max-w-2xl bg-white text-gray-900 p-6 rounded-lg shadow-md shadow-white flex flex-col items-center justify-center">
        <div className="w-full max-w-lg mx-auto mb-8">
          <img src={IMG} alt="Classroom Management" className="w-full h-auto " />
        </div>
          <Link to="/login">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">
              Login
            </button>
          </Link>
        </section>
      </main>

      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2023 Classroom. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
