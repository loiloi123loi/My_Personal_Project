import Conversation from './Conversation'

const Conversations = () => {
    return (
        <div className="py-2 flex flex-col overflow-auto">
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <span className="loading loading-spinner mx-auto"></span>
        </div>
    )
}

export default Conversations
