import React, { useEffect, useRef, useState } from 'react'
import "./LoginLeftChat.css"
import MessageComponent from "../../../conversation/conversationchatside/MessageComponent"

function LoginLeftChat() {
    const [fakeMessageData ,setFakeMessageData] =useState([]) 
    const bodyRef = useRef();
    useEffect(()=>{
    const interval = setInterval(() => {
        setFakeMessageData(curr => [...curr , {message: {
            id: fakeMessageData.length + 1,
            message: "Merhaba",
            user: "Ahmet",
            time: "12:00",
            owner: false
        }}])
        bodyRef.current.lastElementChild.scrollIntoView({behavior: "smooth"});
    }, 4000)
  
    return ()=>{
        clearInterval(interval)
    }
  },[])

  
        
  return (
    <div className='login-left-chat'>
        <div className='login-left-chat-header'>
          
          <img src='ismail.jpg'></img> 
          <div className='header-situation'>
         <p>İsmail Bot</p>
          
           </div>
        </div>
        <div ref={bodyRef} className='login-left-chat-body'>
        {fakeMessageData.map(message => (
            <MessageComponent key={message.id} user={true} data={message}></MessageComponent>
        ))}

        </div>
        <div className='login-left-chat-bottom'></div>
    </div>
  )
}

export default LoginLeftChat