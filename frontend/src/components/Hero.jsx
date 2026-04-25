import React from 'react'
import hero from '../assets/heroImage.png'
export default function Hero() {
  
  return (
    <div className='my-6 flex justify-center items-center '> 
      <img src={hero} alt="Home" className="w-[80%]" />
    </div>
  )
}
