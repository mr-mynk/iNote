import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function Navbar(props) {
  let location = useLocation();
  useEffect(()=>{
  },[location])
  const navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/')
    props.showAlert('success','User Logged out successfully.!')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" >
        <div className="container-fluid">
          <Link className="navbar-brand fs-3" to="/">iNote</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className={`nav-link fs-5 ${location.pathname==='/'?'active':''}`} to="/">Home</Link></li>
              <li className="nav-item"><Link className={`nav-link fs-5 ${location.pathname==='/contact'?'active':''}`} to="/contact">Contact</Link></li>
              <li className="nav-item"><Link className={`nav-link fs-5 ${location.pathname==='/about'?'active':''}`} to="/about">About</Link></li>
            </ul>
          </div>
        </div>
        <div className="">
          {!localStorage.getItem('token')?<form className='d-flex'>
            <Link className='btn btn-primary mx-2' role='button' to='/'>Login</Link>
            <Link className='btn btn-primary mx-2' role='button' to='/signup'>SignUp</Link></form>:
          <button className='btn btn-primary mx-2' onClick={handleLogout}>Logout</button>}
        </div>
      </nav>
    </div>
  )
}
