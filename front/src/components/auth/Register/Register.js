import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import "./Register.css"
import RegisterMap from './RegisterMap/RegisterMap';



function Register() {
  const [logoFile, setLogoFile] = useState(null);
  const [name , setName] = useState("semih");
  const [email , setEmail] = useState(null)
  const [password , setPassword] = useState(null)
  const [password2 , setPassword2] = useState(null)
  const [adress , setAdress] = useState(null)
  const [isAdressOpen , setIsAdressOpen] = useState(false)

  const handleRegister = (e) =>{
    e.preventDefault();
    console.log(logoFile)
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(password2)
    console.log(adress)
  }


  return (
    <div className='register'>
      {isAdressOpen && <RegisterMap name={name} adress={adress} setAdress={setAdress} isAdressOpen={isAdressOpen} setIsAdressOpen={setIsAdressOpen}/>}
      <div className='register-mid'>
      {logoFile ? 
      <img loading='lazy' className='register-img' src={URL.createObjectURL(logoFile)}></img> 
      :
      <img loading='lazy' draggable="false" className='register-img' src={"https://avatars.dicebear.com/api/adventurer/"+name+email+".svg"}></img>
       }
      <input
                                    type="file"
                                    id="fileInput1"
                                    style={{"display":"none"}}
                                    onChange={(e) => setLogoFile(e.target.files[0])}

                                />
                                {logoFile ?  <p onClick={()=>setLogoFile(null)} className="fileInput">X</p> : <label htmlFor="fileInput1" className="fileInput"> + </label>}
      <div className='register-mid-inputs'>
       <div className='register-input-style'>
          <div className='register-input-css'>
          
          <label style={{color:"black"}}>İsim</label>
        <input className='register-inputs' onChange={(e)=>setName(e.target.value)} type="text" ></input>
        <label style={{color:"black"}}>Şifre</label>
        <input className='register-inputs' onChange={(e)=>setPassword(e.target.value)} type="text" ></input>
        
        </div>
        <div className='register-input-css'>
        <label style={{color:"black"}}>E-posta</label>
        <input className='register-inputs' onChange={(e)=>setEmail(e.target.value)}  type="email"></input>
        <label style={{color:"black"}}>Şifre Tekrar</label>
        <input className='register-inputs' onChange={(e)=>setPassword2(e.target.value)} type="text" ></input>
        
        </div>
        </div>
        {
        adress && 
        <div>
          <label style={{color:"black"}}>Adres</label>
          <p className='address-p'>{adress.address}</p>
          </div>
          }
        </div>
        
        <div className='register-adress'>
          {adress ? <div className='register-finish'> 
            <button className='finish-button' onClick={(e)=>{handleRegister(e)}}>Kayıtı Tamamla</button>
            <button onClick={()=>setIsAdressOpen(true)} className='register-adress-p'>{ " Düznlemek için tıkla"}</button> 
          </div> 
          :
            <button onClick={()=>setIsAdressOpen(true)} className='register-adress-p'>Adresi Seç</button>}
        </div>
      </div>
      </div>
  )
}

export default Register