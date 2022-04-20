import React from 'react'
import "./CreatePost.css";
import DoneIcon from '@mui/icons-material/Done';

function CreatePost({props}) {

    const [postImage, setPostImage] = React.useState(null);

  return (
    <div className='createpost'>
        <div className='createpost-body'>
            <div className='createpost-body-header'>
                <h2>Gönderi Oluştur</h2>
                <DoneIcon/>
            </div>
            <div className='createpost-body-body'>
              <textarea maxLength={60} className='title-input' placeholder='Başlık'></textarea>
              <textarea maxLength={120} className='content-input' placeholder='İçerik'></textarea>
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