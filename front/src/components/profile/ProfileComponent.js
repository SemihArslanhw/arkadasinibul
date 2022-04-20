import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { API } from '../../context/BaseAxiosCall';
import { CircularProgress } from "@material-ui/core";
import "./ProfileComponent.css";
import { AuthContext } from '../../context/AuthContext';
import CreatePost from '../post/createPost/CreatePost';

function ProfileComponent() {
    const  id  = useParams().profileId;
    const [isLoading, setIsLoading] = useState(true);
    const [profile , setProfile] = useState({});
    const [isCreating, setIsCreating] = useState(false);
    const { user } = useContext(AuthContext);
    

    useEffect(()=>{
     getProfile();
    },[id])

    const getProfile = () => {
        setIsLoading(true);
        API.get('/users?userId=' + id).then(res => {
            console.log(res.data);
            setProfile(res.data)
            setIsLoading(false);
        }
    )
    }

  return (
    <div className='profile-comp'>
      {isCreating ? 
      <CreatePost 
      isCreating={isCreating}
      setIsCreating={setIsCreating}
      />
        :
      isLoading ? <CircularProgress size="20rem"/> 
        :
         <div className='profile'>
           <div className='user-inf-side'>
             
           <div className='img-side'>
            <img src={profile.profilePicture}></img>
           </div>
           <div className='rigth-side'>
             <div className='rigth-side-css'>
               <div className='rigth-side-top'>
               <h1 style={{fontFamily:"monospace" , color:"white"}}>{profile.username}</h1>
            {id !== user._id ? 
             <div>
             <button className='rigth-side-buttons'>Takip Et</button>
             <button className='rigth-side-buttons'>Mesaj At</button>
             </div>
             :
             <button onClick={()=>{setIsCreating(true)}} className='post-button'>
               Gönderi Oluştur
             </button>
             }</div>
             <div className='rigth-side-bottom'>
              <p>{profile.followers.length} Takipçi</p>
              <p>{profile.followings.length} Takip Edilen</p>
             </div>
             </div>
           </div>
           </div>
           </div>}
        
    </div>
  )
}

export default ProfileComponent