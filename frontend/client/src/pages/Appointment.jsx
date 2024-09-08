import React from 'react'
import AppoinmentForm from '../components/AppoinmentForm';
import Hero from '../components/Hero';


const Appointment = () => {
  return (
    
    <>
      <Hero title={"Schedule Your Appointment | LifeCare Hospital"} imageUrl={"/appointment.png"} />
      <AppoinmentForm/>
    </>
  )
}

export default Appointment;