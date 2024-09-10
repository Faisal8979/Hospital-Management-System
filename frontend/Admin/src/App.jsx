import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Messages from './components/Messages';
import Login from './components/Login';
import Doctors from './components/Doctors';
import Sidebar from './components/Sidebar';
import AddNewDoctor from './components/AddNewDoctor';
import AddNewAdmin from './components/AddNewAdmin';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import { Context } from './main.jsx';
import axios from 'axios';


const APIUrl = "https://hospital-management-backend-7n0m.onrender.com/";

const App = () => {

  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } = useContext(Context);
  
    useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${APIUrl}/api/v1/user/admin/me`, { withCredentials: true });
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    }
    fetchUser();
  },[isAuthenticated])

  return (
    <>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/admin/addnew' element={<AddNewAdmin />} />
          <Route path='/doctor/addnew' element={<AddNewDoctor />} />
          <Route path='/alldoctors' element={<Doctors/> } />
        </Routes>
        <ToastContainer position="top-center" />
    </Router>
    </>
  )
}

export default App;