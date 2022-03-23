import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import "./Register.css"
import RegisterMap from './RegisterMap/RegisterMap';
import { API } from "../../../context/BaseAxiosCall"
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { loginCall } from "../../../context/AuthApiCall";
import { AuthContext } from "../../../context/AuthContext";

function Register() {
  const [logoFile, setLogoFile] = useState("");
  const [name , setName] = useState("");
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [password2 , setPassword2] = useState("")
  const [adress , setAdress] = useState(null)
  const [isAdressOpen , setIsAdressOpen] = useState(false)
  const [isFetching , setIsFetching] = useState(false)

  const navigate = useNavigate();

  const {isLoginFetch , dispatch} = React.useContext(AuthContext);

  const handleRegister = (e) =>{
    console.log(adress)
    e.preventDefault();
    if(password !== password2 && password === null && password2 === null && name === null && email === null ){
      toast.error("Şifreler uyuşmuyor")
      return;
    }else{
      setIsFetching(true)
      if(logoFile){
        const data1 = new FormData();
        const filename1 = name + "_" + email + ".jpg";
        data1.append('name', filename1.trim());
        data1.append('file', logoFile);
        API.post("auth/register",{
            username: name,
            email: email,
            password: password,
            address: adress.address,
            city:adress.city,
            district:adress.district,
            lat:adress.lat,
            lng:adress.lng,
            profilePicture: filename1,
            isProfileSelfAdded: true
          }).then(res => {
          
            API.post("/upload", data1).then(res =>{
            setIsFetching(false)
            toast.success("Kayıt başarılı , giriş işlemi yapılıyor")
            loginCall({email:email,password:password},dispatch)}
            ).catch(err =>{
              toast.error("Fotoğrafınız Yüklenirken Bir Hata Oluştu")
              setIsFetching(false)
            })
        }).catch(err =>{
          toast.error("Kayıt başarısız bilgilerinizi kontrol ediniz")
          setIsFetching(false)
        })
        
      }else{
        API.post("auth/register",{
          username: name,
          email: email,
          password: password,
          address: adress.address,
          city:adress.city,
          district:adress.district,
          lat:adress.lat,
          lng:adress.lng,
          profilePicture: "https://avatars.dicebear.com/api/adventurer/"+name.trim()+email+".svg",
           
        }).then(res =>{
          setIsFetching(false)
          toast.success("Kayıt başarılı , giriş işlemi yapılıyor")
          loginCall({email:email,password:password},dispatch)
        }
          
          
          ).catch(err =>{
            toast.error("Kayıt başarısız bilgilerinizi kontrol ediniz")
            setIsFetching(false)
          })
      }
    
      
    }
  }


  return (
    <div className='register'>
      {isAdressOpen && <RegisterMap name={name} adress={adress} setAdress={setAdress} isAdressOpen={isAdressOpen} setIsAdressOpen={setIsAdressOpen}/>}
      <div className='register-mid'>
        {isFetching || isLoginFetch ? <CircularProgress style={{color:isLoginFetch ? "yellow" : "blue"}} size="5rem"/> : 
        <div style={{alignItems:"center"  ,width:"40%",height:"100%",display:"flex" , flexDirection:"column"}}>
          {logoFile ? 
      <img loading='lazy' className='register-img' src={URL.createObjectURL(logoFile)}></img> 
      :
      <img loading='lazy' draggable="false" className='register-img' src={"https://avatars.dicebear.com/api/adventurer/"+name.trim()+email+".svg"}></img>
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
        <input className='register-inputs' value={name} onChange={(e)=>setName(e.target.value)} type="text" ></input>
        <label style={{color:"black"}}>Şifre</label>
        <input className='register-inputs' value={password} onChange={(e)=>setPassword(e.target.value)} type="text" ></input>
        
        </div>
        <div className='register-input-css'>
        <label style={{color:"black"}}>E-posta</label>
        <input className='register-inputs' value={email} onChange={(e)=>setEmail(e.target.value)}  type="email"></input>
        <label style={{color:"black"}}>Şifre Tekrar</label>
        <input className='register-inputs' value={password2} onChange={(e)=>setPassword2(e.target.value)} type="text" ></input>
        
        </div>
        </div>
        {
        adress && 
        <div className='address-p'>
          <label style={{color:"black"}}>Adres</label>
          <p >{adress.address}</p>
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
          </div>}
      
      </div>
      </div>
  )
}

export default Register