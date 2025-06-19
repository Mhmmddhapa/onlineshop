import React from 'react'
import logo from "../assets/DhapaAdmin.png"
import profile from "../assets/profileDhapa.png"

const Navbar = () => {
  return (
    <div className="max-padd-container flexBetween py-2">
      <img src={logo} alt="logoIcon" height={100} width={100} />
      <img src={profile} alt="profileImg" height={46} width={46} className='rounded-full' />
    </div>
  );
}

export default Navbar
