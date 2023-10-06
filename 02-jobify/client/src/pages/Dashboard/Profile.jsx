import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow } from '../../components'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { updateUser } from '../../features/user/userSlice'

const Profile = () => {
    const { isLoading, user } = useSelector((store) => store.user)
    const dispatch = useDispatch()

    const [userData, setUserData] = useState({
        file: null,
        selectedImg: '',
        name: user?.name || '',
        lastName: user?.name || '',
        location: user?.location || '',
        email: user?.email || '',
    })

    const handleChange = (e) => {
        const name = e.target.name
        if (name === 'avatar') {
            const selectedImg = e.target.value
            const file = e.target.files[0]
            setUserData({ ...userData, file, selectedImg })
            return
        }
        const value = e.target.value
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { file, name, lastName, location, email } = userData
        if (!name || !lastName || !location || !email) {
            toast.error(`Please fill out all fields`)
            return
        }
        if (file && file.size > 512 * 1024) {
            toast.error('Image too large to submit')
            return
        }
        dispatch(
            updateUser({
                file,
                name,
                lastName,
                location,
                email,
            })
        )
    }

    useEffect(() => {
        if (user) {
            setUserData({
                file: null,
                selectedImg: '',
                name: user?.name || '',
                lastName: user?.lastName || '',
                location: user?.location || '',
                email: user?.email || '',
            })
        }
    }, [user])

    return (
        <Wrapper>
            <form
                className="form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <h4 className="form-title">profile</h4>
                <div className="form-center">
                    <FormRow
                        type="file"
                        name="avatar"
                        required={false}
                        accept="image/*"
                        labelText="Select An Image File (Max 0.5 MB)"
                        value={userData.selectedImg}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type="text"
                        name="name"
                        value={userData.name}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type="text"
                        labelText="last name"
                        name="lastName"
                        value={userData.lastName}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type="email"
                        name="email"
                        value={userData.email}
                        disabled={true}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type="text"
                        name="location"
                        value={userData.location}
                        handleChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="btn btn-block"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Please Wait...' : 'save changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default Profile
