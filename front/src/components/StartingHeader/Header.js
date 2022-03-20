import React, { useContext } from 'react'
import "./Header.css"
import {  useNavigate }  from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Header() {

  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  return (
    <div className='header'>
        <div className='headerLeft'>
           <h1 style={{cursor:"pointer"}} onClick={()=>navigate("/")}>Logo</h1>
        </div>
        <div className='headerRigth'>
          <p>Profilim</p>
          <p style={{cursor:"pointer"}} onClick={()=>navigate("/sohbet")}>Sohbet</p>
          {user ? <p>{user.username}</p> : <p>Hesap Aç</p>}
          </div>
        </div>
  )
}

export default Header