import React, { useContext, useEffect, useRef, useState } from 'react'
import {io} from "socket.io-client";
import "./ConversationChatComponent.css"
import MessageComponent from './MessageComponent';
import { AuthContext } from '../../../context/AuthContext';
import { API } from '../../../context/BaseAxiosCall';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ConversationChatComponent() {
    const chatRef = useRef();
    const mesajInput = useRef();
    const socket = useRef();
    const [messages, setMessages] = useState([]);
    const [toBottom, setToBottom] = useState(false);
    const [chattingUser , setChattingUser] = useState({});
    const [newMessageCount , setNewMessageCount] = useState(0);
    const [conversations , setConversations] = useState([]);
    const [onlineUsers , setOnlineUsers] = useState([]);
    const [currentChat , setCurrentChat] = useState({});
    
    let params = useParams();

    const { user } = useContext(AuthContext);

    useEffect(()=>{

      API.get("/conversations/findbyId/"+params.convId).then((res)=>{
        setCurrentChat(res.data)
        const receiverId = res.data.members.find(
          (member) => member !== user._id
        );
        API.get("/users?userId="+ receiverId).then((res)=>{
          setChattingUser(res.data)
          console.log(res.data)
        })
        API.get("/messages/" + res?.data._id).then((ress)=>{
         console.log(ress.data)
         setMessages(ress.data)
         chatRef.current.lastElementChild.scrollIntoView();
        })
        
      })
      
             
      chatRef.current.addEventListener("scroll",()=>{
        const lastChild = chatRef.current.lastChild;
        if((chatRef.current.scrollHeight - chatRef.current.clientHeight - chatRef.current.scrollTop > Math.ceil(lastChild.clientHeight + 40))){
          setToBottom(true);
        }else{
            setNewMessageCount(0);
            setToBottom(false);
        }
      })
          

        socket.current = io("http://localhost:3002")
        
        socket.current.on("connect", ()=>{
            console.log("connected")
        })
        
        socket.current.emit("addUser", user._id);
        

        socket.current.on("getMessage",(data)=>{
         console.log(data)
         setMessages(messages => [...messages, data])
         setNewMessageCount(newMessageCount + 1)
        

         let lastChild = chatRef.current.lastElementChild;
         
          if(lastChild &&  !(chatRef.current.scrollHeight - chatRef.current.clientHeight - chatRef.current.scrollTop > Math.ceil(lastChild.clientHeight + 10)) ){
            lastChild.scrollIntoView({behavior: "smooth"});
            
          }
        }) 
        return ()=>{
            socket.current.disconnect()
        }

        },[params])

        

        
        
      
        const handleMessageSend = (e)=>{
            e.preventDefault();
            const receiverId = currentChat.members.find(
              (member) => member !== user._id
            );
            const message = mesajInput.current.value;
            console.log(receiverId , user._id , mesajInput.current.value)
            if(mesajInput.current.value !== ""){
              API.post("/messages",{
                sender: user._id,
                conversationId: params.convId,
                text: mesajInput.current.value
                }).then((res)=>{
              socket.current.emit("sendMessage",
              {
                text:message ,
                senderId: user._id,
                receiverId: receiverId, 
              });
              setMessages(messages => [...messages, {
                createdAt: new Date(),
                sender: user._id,
                text: message
              }])
              chatRef.current.lastElementChild.scrollIntoView({behavior: "smooth"});
            }).catch((err)=>{
               toast.error("Mesajınız gönderilemedi")
               console.log(err)
            }
              
             
            )
          }
            mesajInput.current.value = "";
            chatRef.current.lastElementChild.scrollIntoView();
         }

         const toBottomm = ()=>{
            
            chatRef.current.lastElementChild.scrollIntoView({behavior: "smooth"});
            
          }

  return (
    <div className='conv-side'> 
       
    <div className='conv-top'>
     <div className='conv-top-user'>
      <img src={chattingUser.isProfilePictureSelfAdded ? "https://localhost:8080/images/İsmail_ismail@hotmail.com.jpg" : chattingUser.profilePicture}></img>
     </div>
      <div className='conv-top-inf'>
        <h3>{chattingUser.username}</h3>
        
      </div>
      </div>
    <div ref={chatRef} className='conv-body'>
     {toBottom && <div onClick={()=>{toBottomm()}} className='to-bottom'><img src='tobottom.png'></img>{newMessageCount !== 0 && <p>{newMessageCount}</p>}</div>}
    {messages.map((mes , i)=>{
      return <div className='conv-body-css'> <MessageComponent user={user._id} key={i} data={mes} ></MessageComponent> </div>
    })}
    
      </div>
    
   
    <div className='conv-bottom'>
    <form className='submit-form' onSubmit={(e)=>handleMessageSend(e) }>
<input  ref={mesajInput} className='form-input'  type="text" placeholder='Mesaj Yolla'></input>
<button className='form-button' type='submit'><img style={{width:40}} src='send.png'></img></button>
</form>
      </div>


</div>
  )
}

export default ConversationChatComponent