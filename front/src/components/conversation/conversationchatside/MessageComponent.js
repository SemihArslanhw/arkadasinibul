import React from 'react'
import "./MessageComponent.css"

function MessageComponent({data , user}) {

  return (
    <div>
    <div className={data.sender === user ? 'message-owner' : 'message'}>
        {data?.text}
        <p>{new Date(data?.createdAt).toDateString()}</p>
        </div>
        </div>
  )
}

export default MessageComponent