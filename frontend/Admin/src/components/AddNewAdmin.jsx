import React, { useContext, useState } from 'react';
import { Context } from '../Main';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const APIUrl = "https://hospital-management-backend-six.vercel.app/";

const AddNewAdmin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");

    const { isAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
       const response= await axios.post(
        `${APIUrl}/api/v1/user/admin/add-new`,
        { firstName, lastName, email, phone, gender, nic, dob, password },
        {
          withCredentials: true,
          headers:{"Content-Type": "application/json"},
        }
      )
        toast.success(response.data.message);
        navigate("/")
        // setEmail("");
        // setPassword("")
        // setConfirmPassword("");
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  if (!isAuthenticated) {
      return <Navigate to={"/login"}/>
  }
  return (
    <>
      <section className='page'>
        <section className="container form-component add-admin-form">
            <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">ADD NEW ADMIN</h1>
       <form onSubmit={handleAddNewAdmin}>
          <div>
            <input
              type='text'
              placeholder='First Name*'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} 
              />
            <input
              type='text'
              placeholder='Last Name*'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              />
          </div>
          <div>
            <input
              type='text'
              placeholder='Email*'
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              />
            <input
              type='number'
              placeholder='Phone No.*'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              />
          </div>
          <div>
            <input
              type='nimber'
              placeholder='NIC*'
              value={nic}
              onChange={(e) => setNic(e.target.value)} 
              />
            <input
              type='date'
              placeholder='Date Of Birth*'
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type='password'
              placeholder='Password*'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
      
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Add New Admin</button>
          </div>
        </form>
    </section>
    </section>
    </>
  )
}

export default AddNewAdmin;