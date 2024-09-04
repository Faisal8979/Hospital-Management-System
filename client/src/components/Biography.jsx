import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className='container biography'>
        <div className='banner'>
          <img src={imageUrl } alt='about' />
        </div>
        <div className='banner'>
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>LifeCare Hospital, where compassionate care meets cutting-edge technology.
            We are a dedicated team of healthcare professionals committed to providing
            the highest quality medical services. Our mission is to deliver personalized
            care with empathy, respect, and excellence, ensuring the well-being of our
            patients and their families.</p>
          <p>
            At LifeCare Hospital, we believe in continuous innovation and strive to stay
            at the forefront of medical advancements. With state-of-the-art facilities and
            a patient-centric approach, we aim to create a healing environment that promotes
            health, hope, and happiness
          </p>
          <p>
            This content can be customized to fit the specific values and vision of the hospital.
          </p>
        </div>
      </div>
    </>
  )
}

export default Biography;