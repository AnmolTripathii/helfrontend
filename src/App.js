import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Update from './pages/dashboard/Update';
import Register from './pages/dashboard/Register';
import Details from './pages/dashboard/Details';
import Dashboard from './pages/dashboard/Dashboard';
import Classroom from './pages/dashboard/Classroom';

function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="register" element={<Register />} />
            <Route path="details" element={<Details />} />
            <Route path="classroom" element={<Classroom />} />
          </Route>
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
