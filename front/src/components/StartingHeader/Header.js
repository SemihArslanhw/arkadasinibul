import React from 'react'
import "./Header.css"
import {  useNavigate }  from 'react-router-dom';

function Header() {

  const navigate = useNavigate();
  
  return (
    <div className='header'>
        <div className='headerLeft'>
           <h1 style={{cursor:"pointer"}} onClick={()=>navigate("/")}>Logo</h1>
        </div>
        <div className='headerRigth'>
          <p>Bildirimler</p>
          <p style={{cursor:"pointer"}} onClick={()=>navigate("/sohbet")}>Sohbet</p>
          <p>Hesap Aç</p>
          </div>
        </div>
  )
}

export default Header