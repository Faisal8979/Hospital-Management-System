import React, { useContext, useState } from 'react';
import {Link, useNavigate } from "react-router-dom";
import { Context } from "../Main";
import axios from 'axios';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";

const APIUrl = "https://hospital-management-backend-six.vercel.app/";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            await axios.get(`${APIUrl}/api/v1/user/patient/logout`,
                {
                    withCredentials: true,
                }
            ).then((res) => {
                toast.success(res.data.message);
                setIsAuthenticated(false);
            })
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    }
    const gotoLogin = async() => {
        navigate("/login")
    }
  return (
      <>
          <nav className={"container"}>
              <div className={show ? "logo-img-hide" : "logo-img"}>
                   <div className='logo'>
                  <img src="/logo.png" alt="logo" className="logo-img" />
              </div>
             </div>
              <div className='lifecare'><h3><span style={{color:'red',fontSize:'40px'}}>L</span>ife<span style={{color:'red',fontSize:'40px'}}>C</span>are Hospital</h3></div>
              <div className={show ? "navLinks showmenu" : "navLinks"}>
                  <div className='links'>
                  <Link to={"/"} onClick={() => setShow(!show)}>HOME</Link>
                  <Link to={"/appointment"} onClick={() => setShow(!show)}>APPOINTMENT</Link>
                  <Link to={"/about"} onClick={() => setShow(!show)}>ABOUT US</Link>
                      </div>
              
              {isAuthenticated ? (
                  <button className='logoutBtn btn' onClick={handleLogout}>LOGOUT</button>
                  ) : (
                          <button className='loginBtn btn' onClick={gotoLogin}>LOGIN</button>
                  )}
                  </div>
               <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
          </nav>
    </>
  )
}

export default Navbar;