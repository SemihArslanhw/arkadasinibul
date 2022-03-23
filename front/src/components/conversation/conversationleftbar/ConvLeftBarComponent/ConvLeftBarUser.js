import React, { useEffect, useState } from 'react'
import { API } from '../../../../context/BaseAxiosCall';
import "./ConvLeftBarUser.css"
import { useNavigate } from 'react-router-dom';

function ConvLeftBarUser({conversation , currentUserId}) {
  const [user , setUser] = useState({});
  
  const navigate = useNavigate();

  useEffect(()=>{
  const friendId = conversation.members.find((m)=> m !== currentUserId)

   API.get("/users/?userId="+friendId).then((res)=>{
   console.log(res)
   setUser(res.data)
   })
  },[])
  
  return (
    <div onClick={()=>navigate("/sohbet/" + conversation._id)} className='conv-leftbar-card'>
      <img className='conv-leftbar-card-img' src={user.profilePicture}></img>
      <p>{user.username}</p>
    </div>
  )
}

export default ConvLeftBarUser