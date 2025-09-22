import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = ({ url }) => {
  return (
    <div className='navbar'>
        <div className="navbar-logo">
          <img src={assets.logo} alt="Furniro Logo" className="logo-icon" />
          <span className="logo-text">Furniro</span>
        </div>
        <img className='profile' src={assets.profile_image} alt="" />
      
    </div>
  )
}

export default Navbar
