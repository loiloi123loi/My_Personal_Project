import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'

function App() {
    const [file, setFile] = useState(null)
    const [srcImg, setSrcImg] = useState('')
    const handleChange = (e) => {
        setFile(e.target.files[0])
        setSrcImg(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!file) {
            console.log('chưa có file')
            return
        }
        console.log(file)
        axios
            .patch(
                'http://localhost:5000/api/v1/user/update-profile',
                { file },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            .then((resp) => {
                console.log(resp.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                id="avatar"
                type="file"
                name="avatar"
                value={srcImg}
                onChange={handleChange}
                accept="image/*"
            />
            <button>submit</button>
        </form>
    )
}

export default App
