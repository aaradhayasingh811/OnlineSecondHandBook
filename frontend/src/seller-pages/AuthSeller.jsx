import React from 'react'
import LoginSeller from '../seller-component/LoginSeller';
import RegisterSeller from '../seller-component/RegisterSeller';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom'

const Auth = () => {
    const location = useLocation();
    const path = location.pathname;  
    const route = path.split('/').pop(); 

  return (
    <div>
        {route === 'loginSeller' && <LoginSeller/>}
        {route === 'registerSeller' && <RegisterSeller/>}
        
    </div>
  )
}

export default Auth