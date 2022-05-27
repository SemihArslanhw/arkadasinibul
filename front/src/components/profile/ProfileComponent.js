import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { API } from '../../context/BaseAxiosCall';
import { CircularProgress } from "@material-ui/core";
import "./ProfileComponent.css";
import { AuthContext } from '../../context/AuthContext';
import CreatePost from './Post/CreatePost';
import PostComponent from './Post/PostComponent';
import { PF } from '../../context/BaseAxiosCall';

function ProfileComponent() {
    const  id  = useParams().profileId;
    const [isLoading, setIsLoading] = useState(true);
    const [profile , setProfile] = useState({});
    const [isCreating, setIsCreating] = useState(false);
    const [posts , setPosts] = useState([]);
    const [isPostMode, setIsPostMode] = useState(false);
    const [selectedPost , setSelectedPost] = useState({});
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
        })
       
        API.get("/posts?senderId=" + id).then(res => {
            console.log(res.data);
            setPosts(res.data);
        })
    
    }

  return (
    <div className='profile-comp'>
      {isCreating && 
      <CreatePost 
      posts={posts}
      setPosts={setPosts}
      isCreating={isCreating}
      setIsCreating={setIsCreating}
      userId={user._id}
      />
}
      {isPostMode &&  
      <PostComponent
      selectedPost={selectedPost}
      setIsPostMode={setIsPostMode}
      sender={profile}
      />
      }
     
      {isLoading ? <CircularProgress size="20rem"/> 
        :
         <div className='profile'>
           <div className='user-inf-side'>
             
           <div className='img-side'>
            <img src={profile?.profilePicture}></img>
           </div>
           <div className='rigth-side'>
             <div className='rigth-side-css'>
               <div className='rigth-side-top'>
               <h1 style={{fontFamily:"monospace" , color:"white"}}>{profile?.username}</h1>
            {id !== user?._id ? 
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
              <p>{profile?.followers.length} Takipçi</p>
              <p>{profile?.followings.length} Takip Edilen</p>
             </div>
             </div>
           </div>
           </div>
           <div className='user-posts-side'>
           {posts?.map((post , i)=>{
              return <div className='user-post-side-img'>
                  <img onClick={()=>{setSelectedPost(post);setIsPostMode(true)}} src={ PF + post.image }></img>
                     </div>
                
         
           })}
            </div>
           </div>}
        
    </div>
  )
}

export default ProfileComponent