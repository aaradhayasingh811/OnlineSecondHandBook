import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom'

const Auth = () => {
    const location = useLocation();
    const path = location.pathname;  
    const route = path.split('/').pop(); 

  return (
    <div>
        {route === 'login' && <Login/>}
        {route === 'register' && <Register/>}
        
    </div>
  )
}

export default Auth