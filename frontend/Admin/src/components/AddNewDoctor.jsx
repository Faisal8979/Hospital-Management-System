import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';

const APIUrl = "https://hospital-management-backend-7n0m.onrender.com/";

const AddNewDoctor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvtar, setDocAvtar] = useState("");
  const [docAvtarPreview, setDocAvtarPreview] = useState("");


    const departmentArray = [
    "Cardiologist",
    "Oncologist",
    "Gastroenterologist",
    "Pediatrics",
    "Ophthalmology",
    "Nephrologist",
    "Geriatrics",
    "Dermatologist",
    "Hematology",
    "Endocrinologist",
    "Psychiatrist",
    "Radiologist",
    "Pathology",
    "Allergist",
    "Anesthesiology",
    "Pulmonologist"
  ]
  

    const { isAuthenticated} = useContext(Context);

  const navigate = useNavigate();

   const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvtarPreview(reader.result);
      setDocAvtar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("gender", gender);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("password", password);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvtar", docAvtar);
      // formData.append("docAvtarPreview", docAvtarPreview);

       const {data}= await axios.post(
        `${APIUrl}/api/v1/user/doctor/addnew`,
         formData,
        {
          withCredentials: true,
          headers:{"Content-Type": "multipart/form-data"},
        }
      )
        toast.success(data.message);
        navigate("/")
        // setEmail("");
        // setPassword("")
        // setConfirmPassword("");
      
    } catch (error) {
      console.log(error);
      toast.error(error.data.message)
    }
  }

  if (!isAuthenticated) {
      return <Navigate to={"/login"}/>
  }
  return (
    <>
      <section className='page'>
        <section className="container add-doctor-form">
            <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
          <form onSubmit={handleAddNewDoctor}>
            <div className='first-wrapper'>
              <div>
                 <motion.img
                  src={docAvtarPreview ? `${docAvtarPreview}` : "/docHolder.jpg"}
                  alt='doctor-avtar'
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  whileHover={{ scale: 1.1 }}            
    />
                {/* <img className='doc-img' src={docAvtarPreview ? `${docAvtarPreview}` : "/docHolder.jpg"} alt='doctor-avtar' /> */}
                <input
                  type='file'
                 onChange={handleAvatar}
                />
              </div>
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
                <select
                  value={doctorDepartment}
                  onChange={(e) => setDoctorDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  {departmentArray.map((depart, index) => (
                    <option value={depart} key={index}>{depart}</option>
                  ))}
                  </select>
                 <button type="submit">Register New Doctor</button>
              </div>
            </div>
        </form>
    </section>
    </section>
    </>
  )
}

export default AddNewDoctor;