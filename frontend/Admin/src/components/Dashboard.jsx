import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from 'react-toastify';

const APIUrl = "https://hospital-management-backend-six.vercel.app/";

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context);
  
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(`${APIUrl}/api/v1/appointment/getallappointment`,
          { withCredentials: true, }
        )
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    }
    fetchAppointments();
  }, []);
   useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`${APIUrl}/api/v1/user/doctors`,
          { withCredentials: true, }
        )
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchDoctors();
   }, []);
  
   const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `${APIUrl}/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      ); 
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"}/>
  }
  return (
    <>
      <section className='dashboard page'>
        <div className='banner'>
          <div className='firstBox'>
            <img 
              src='/doc.png'
              alt='docImg'
            />
            <div className='content'>
              <div>
                <p>Hello ,</p>
                <h5>
                  {user &&
                  `${user.firstName} ${user.lastName}`
                  }
                </h5>
              </div>
              <p>
                We are delighted to have you here. Our goal is to provide you
                with a comprehensive and user-friendly platform for managing
                all aspects of hospital operations. Whether you're a medical
                professional, administrative staff, or part of the management
                team.
              </p>
            </div>
          </div>
          <div className='secondBox'>
            <p>Totol Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className='thirdBox'>
            <p>Register Doctors</p>
            <h3>{doctors.length}</h3>
          </div>
        </div>
        <div className='banner'>
           
          <h5>Appointments</h5>
          <table>
          
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => {
                  return(
                  <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.appointment_date.substring(0, 16)}</td>
                      <td>{appointment.doctor.firstName} {appointment.doctor.lastName}</td>
                      <td>{appointment.department}</td>
                       <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                       <td>{appointment.hasVisited === true ? <GoCheckCircleFill className="green"/> : <AiFillCloseCircle className="red"/>}</td>
                    </tr>
                    )
              })
              ): 
                (
                  <h1>No Appointments Found!</h1>
              )}
              </tbody>
            
            </table>
              </div>
        
    </section>
    </>
  )
}

export default Dashboard;