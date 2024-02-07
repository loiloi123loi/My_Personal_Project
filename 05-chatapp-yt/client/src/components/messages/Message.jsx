const Message = () => {
    return (
        <div className={`chat ${'Loi Tran'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={''} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${''} ${''} pb-2`}>
                {'content'}
            </div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
                {'1/1/2023'}
            </div>
        </div>
    )
}
export default Message
