import React from 'react'
import "./MessageComponent.css"

function MessageComponent({data , user}) {
  return (
    <div>
    <div className={user ? 'message-owner' : 'message'}>
        {data.message.message}
        <p>{data.message.date}</p>
        </div>
        <svg color='red'  viewBox="0 0 8 13" width="8" height="13" class=""><path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg>
        </div>
  )
}

export default MessageComponent