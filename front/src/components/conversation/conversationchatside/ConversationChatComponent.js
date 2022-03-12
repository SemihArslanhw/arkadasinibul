import React, { useEffect, useRef, useState } from 'react'
import {io} from "socket.io-client";
import "./ConversationChatComponent.css"
import MessageComponent from './MessageComponent';

function ConversationChatComponent() {
    const chatRef = useRef();
    const mesajInput = useRef();
    const socket = useRef();
    const [messages, setMessages] = useState([]);
    const [toBottom, setToBottom] = useState(false);
    const [newMessageCount , setNewMessageCount] = useState(0);
    

    useEffect(()=>{
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
        
        socket.current.on("message",(data)=>{

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
        },[])

        useEffect(()=>{
        },[window.sc])
      
        const handleMessageSend = (e)=>{
            e.preventDefault();
            if(mesajInput.current.value !== ""){
              socket.current.emit("message",
              {message : mesajInput.current.value
              ,name : "ali",
              date: new Date().toDateString()})
            }
            chatRef.current.lastElementChild.scrollIntoView();
         }

         const toBottomm = ()=>{
            
            chatRef.current.lastElementChild.scrollIntoView({behavior: "smooth"});
            
          }

  return (
    <div className='conv-side'> 
       
    <div className='conv-top'>
      
      </div>
    <div ref={chatRef} className='conv-body'>
     {toBottom && <div onClick={()=>{toBottomm()}} className='to-bottom'><img src='tobottom.png'></img>{newMessageCount !== 0 && <p>{newMessageCount}</p>}</div>}
    {messages.map((mes , i)=>{
      return <div className='conv-body-css'> <MessageComponent user={mes.userId === socket.current.id} key={i} data={mes} ></MessageComponent> </div>
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