import React, { useEffect } from 'react'
import "./ConversationLeftBar.css"
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { API } from '../../../context/BaseAxiosCall'
import ConvLeftBarUser from './ConvLeftBarComponent/ConvLeftBarUser'

function ConversationLeftBar() {
  const { user } = useContext(AuthContext)
  const [conversationDatas, setConversationDatas] = React.useState([])

  useEffect(() => {
    console.log(user)
    API.get('/conversations/'+user._id).then(res =>{
      setConversationDatas(res.data)
    }
    )
  }, [])
  return (
    <div className='Left-Bar'>
      {conversationDatas.map((data , i)=>{
        return <ConvLeftBarUser key={i} currentUserId={user._id} conversation={data}/>
      })}
        </div>
  )
}

export default ConversationLeftBar