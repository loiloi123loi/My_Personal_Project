import io from 'socket.io-client'

let socket

const createNewIO = ({ userId }) => {
    socket = io('http://localhost:5000/', {
        query: {
            userId,
        },
    })
}

export { socket, createNewIO }
