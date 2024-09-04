import React from 'react'

const Hero = ({title, imageUrl}) => {
  return (
    <>
       <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
              At Life Care Hospital, we are committed to providing
            top-notch healthcare services with efficiency and care.
            Our Hospital Management System is designed to streamline
            hospital operations, ensuring a seamless experience for patients,
            doctors, and staff.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  )
}

export default Hero;