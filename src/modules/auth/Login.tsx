import React from 'react'
import LoginForm from './LoginForm'
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css"
import Logo from "../../asset/logo.png"
const Login = () => {
  return (
    <div className='login'>
      <img className='logo' src={Logo} alt=''/>
        <LoginForm /> 
        <ToastContainer />
    </div>
  )
}

export default Login
