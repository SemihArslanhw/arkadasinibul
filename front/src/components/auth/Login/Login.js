import React from 'react'
import "./Login.css"
import LoginLeftChat from "./LoginComponent/LoginLeftChat";
import { CircularProgress } from "@material-ui/core";
import { loginCall } from "../../../context/AuthApiCall";

import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

function Login() {
  const email = React.useRef();
  const password = React.useRef();
  const {isFetching , dispatch} = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e)=>{
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }

  return (
    <div className='login'>
      <div className='login-cont'>
      <div className='login-left'>
        <LoginLeftChat/>
      </div>
      <div className='login-right'>
      <h1>Giriş Yap</h1>
      {isFetching ? <div className='loader'>
        <CircularProgress size="5rem"/>
        </div>
         :
         <form onSubmit={(e)=>{handleLogin(e)}} className='login-form'>
         <div>
         <label className='form-label'>Email</label>
         <input className='form-input' ref={email} type='email' required placeholder='Email' />
         </div>
         <div>
         <label className='form-label'>Şifre</label>
         <input className='form-input' ref={password} type='password' required placeholder='Şifre' />
         </div>
         <button type='submit'>Login</button>
       </form>
        }
       <p style={{color:"black"}}>Mevcut değil ise <span onClick={()=>navigate("/kayitol")} style={{color:"red",cursor:"pointer",fontFamily:"sans-serif"}}>hesap aç</span></p>
      </div>
      </div>
    </div>
  )
}

export default Login