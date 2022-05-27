import React, { useEffect } from 'react'
import "./CreatePost.css";
import DoneIcon from '@mui/icons-material/Done';
import { API } from '../../../context/BaseAxiosCall';
import { toast } from 'react-toastify';
import { getLinearProgressUtilityClass } from '@mui/material';

function CreatePost({isCreating , posts , setPosts , setIsCreating , userId}) {
    
    const [title , setTitle] = React.useState('');
    const [content , setContent] = React.useState('');
    const [postImage, setPostImage] = React.useState(null);
    const [isFetching, setIsFetching] = React.useState(false);

    useEffect(()=>{
    
    document.getElementById('postcss').style.opacity = '1';
    
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        if( title === "" && content === ""  ){
          toast.error("Boş bırakmayın")
          return;
        }else{
          setIsFetching(true)
          if(postImage){
            const data1 = new FormData();
            const filename1 = new Date().getMilliseconds() + userId;
            data1.append('name', filename1.trim());
            data1.append('file', postImage);
            API.post("posts",{
                title: title,
                content: content,
                image: filename1,
                senderId: userId,

              }).then(res => {
              
                API.post("/upload", data1).then(ress =>{
                setIsFetching(false)
                console.log(res.data);
              setPosts([res.data , ...posts ])
                
                toast.success("Post Başarı İle Oluşturuldu")
                setIsCreating(false)
                }).catch(err =>{
                  toast.error("Fotoğrafınız Yüklenirken Bir Hata Oluştu")
                  setIsFetching(false)
                })
            }).catch(err =>{
              toast.error("Post Oluşturulurken Bir Hata Oluştu")
              setIsFetching(false)
            })
            
          }
        }
        
    }

  return (
    <div id='postcss' style={{opacity:0}} onClick={(e)=>{e.target === e.currentTarget && setIsCreating(false)}} className='createpost'>
        <div className='createpost-body'>
            <div className='createpost-body-header'>
                <h2>Gönderi Oluştur</h2>
                <DoneIcon onClick={(e)=>handleSubmit(e)}/>
            </div>
            <div className='createpost-body-body'>
              <textarea maxLength={60} value={title} onChange={(e)=>{setTitle(e.target.value)}} className='title-input' placeholder='Başlık'></textarea>
              <textarea maxLength={120} value={content} onChange={(e)=>{setContent(e.target.value)}} className='content-input' placeholder='İçerik'></textarea>
              {postImage ?
              <div className='on-image'>
              <img src={URL.createObjectURL(postImage)} alt='postImage'/>
              </div>
              :
              <label for="file-upload" class="custom-file-upload">
               Custom Upload
              </label>
              }
              
              <input type="file" id="file-upload" onChange={(e) => setPostImage(e.target.files[0])} ></input>

            </div>
        </div>
    </div>
  )
}

export default CreatePost