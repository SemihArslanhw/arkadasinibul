import React, { useContext } from 'react'
import "./HomeBodyFriends.css"
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from "../../../context/AuthContext";
import {  useNavigate }  from 'react-router-dom';
import { API } from '../../../context/BaseAxiosCall';
import { toast } from 'react-toastify';

function HomeBodyFriends({usersDatas}) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)
  
  const handleCreateConversation = (createrId , takerId) =>{
    API.get('/conversations/find/'+createrId+'/'+takerId).then(res =>{
     if(res.data){
     navigate("/sohbet/" + res.data._id)
     }else{
      API.post("/conversations" , {
        senderId:createrId,
        receiverId:takerId
       }).then((res)=>{
         toast.success("Konuşma odası oluşturuldu aktarılıyorsunuz");
         console.log(res.data._id)
         setTimeout(()=>{
          navigate("/sohbet/" + res.data._id)
         },1000)
         }
       ).catch(()=>{
         toast.error("Bir Hata Oldu Tekrar Deneyiniz")
       })
     }
   })
  }

  return (
    <div className='home-friends'>
      {usersDatas.map((data , i)=>{
        if(data._id !== user._id) return <div onClick={()=>navigate("/profil/"+data._id)} key={i} className='friend-card'>
          <div className='friend-card-left'>
          <div className='friend-card-left-image'>
            <img src={data.profilePicture}></img>
          </div>
           <div>
              <p>{data.username}</p>
              <p>{data.city + "/" + data.district}</p>
            </div>
          </div>
          <div onClick={()=>{handleCreateConversation(user._id,data._id)}} className='friend-card-rigth'>
           <SendIcon/>
          </div>
        </div>
      })}
    </div>
  )
}

export default HomeBodyFriends