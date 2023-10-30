import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/authSlice'
import './categorybar.css';

function CategoryBar() {
  return (
    <nav className="navbar" style={{height:"40px",textAlign:"center",width:"100%"}}>
      <div className="navbar-item"><Link className='nav-link' to='/mobiles'>
                   Mobiles
                </Link></div>
      <div className="navbar-item"><Link className='nav-link' to='/clothing'>
                   Clothing
                </Link></div>
      <div className="navbar-item"><Link className='nav-link' to='/electronics'>
                   Electronics
                </Link></div>
      <div className="navbar-item"><Link className='nav-link' to='/sports'>
                   Sports
                </Link></div>
      <div className="navbar-item"><Link className='nav-link' to='/books'>
                   Books
                </Link></div>
    </nav>
  );
}

export default CategoryBar
