import React, { useContext, useState } from 'react'
import {  Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../Main';

const APIUrl = "https://hospital-management-backend-six.vercel.app/";

const Login = () => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


   const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  
  const navigate = useNavigate();

  const handleLogin = async (e) =>{
    e.preventDefault();
    try {
       const response= await axios.post(
        `${APIUrl}/api/v1/user/login`,
        { email, password, confirmPassword, role: "Admin" },
        {
          withCredentials: true,
          headers:{"Content-Type": "application/json"},
        }
      )
        toast.success(response.data.message);
        setIsAuthenticated(true);
        navigate("/")
        // setEmail("");
        // setPassword("")
        // setConfirmPassword("");
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }
  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }
  return (
    <>
      <section className='container form-component'>
        <img src='/logo.png' alt='logo' className='logo' />
         <h1 className="form-title">WELCOME TO LIFECARE</h1>
        <p>Only Admins Are Allowed To Access These Resources!</p>
        <form onSubmit={handleLogin}>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email*' />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password*' />
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password*' />
        <div style={{justifyContent:"center", alignItems:"center"}}>
          <button type='submit'>Login</button>
        </div>
        </form>
      </section>
    </>
  )
}

export default Login;