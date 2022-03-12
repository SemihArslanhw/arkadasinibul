import ConversationChatComponent from "./conversationchatside/ConversationChatComponent"
import ConversationLeftBar from "./conversationleftbar/ConversationLeftBar"
import "./ConversationComponent.css"

function ConversationComponent() {
    
  return (
    <div className="conversation">
       <ConversationLeftBar/>
       <ConversationChatComponent/>
    </div>
  )
}

export default ConversationComponent