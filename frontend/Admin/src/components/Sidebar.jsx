import React, { useContext, useState } from 'react'
import { Context } from '../Main';
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


 const APIUrl = "https://hospital-management8979.vercel.app/";

const Sidebar = () => {
    const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigate = useNavigate();


  const gotoHome = () => {
    navigate("/");
    setShow(!show)
  }
  const gotoMessages = () => {
    navigate("/messages")
    setShow(!show);
  }
    const gotoAddAdmin = () => {
    navigate("/admin/addnew")
    setShow(!show);
  }
    const gotoAddDoctor = () => {
    navigate("/doctor/addnew")
    setShow(!show);
  }
    const gotoDoctors = () => {
    navigate("/alldoctors")
    setShow(!show);
  }

    const handleLogout = async () => {
    await axios.get(`${APIUrl}/api/v1/user/admin/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
        
      });
  };
  return ( 
    <>
      <nav style={!isAuthenticated ? { display: "none" } : { display: 'flex' }}
      className={show ? 'show sidebar' : 'sidebar'}
      >
        <div className='links'>
  
          <TiHome onClick={gotoHome}/>
          <FaUserDoctor onClick={gotoDoctors}/>
          <MdAddModerator onClick={gotoAddAdmin}/>
          <IoPersonAddSharp onClick={gotoAddDoctor} />
          <AiFillMessage onClick={gotoMessages} />
            <RiLogoutBoxRFill onClick={handleLogout} />
            
        </div>
        
      </nav>
      <div
      style={!isAuthenticated ? {display:'none'} : {display:'flex'}}
        className='wrapper'>
                 
          <GiHamburgerMenu className='hamburger' onClick={() => setShow(!show)} />
          
        </div>
        
   </>
  
  )
}

export default Sidebar;