import Wrapper from '../assets/wrappers/RegisterPage'
import Logo from '../components/Logo'
import FormRow from '../components/FormRow'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { registerUser } from '../features/user/userSlice'

const initialState = {
    name: '',
    lastName: '',
    location: '',
    email: '',
    password: '',
}

const Register = () => {
    const [values, setValues] = useState(initialState)
    const { isLoading, user } = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, lastName, location, email, password } = values
        if (!name || !lastName || !location || !email || !password) {
            toast.error(`Please enter all values`)
            return
        }
        dispatch(registerUser({ name, lastName, location, email, password }))
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/dashboard')
            }, 2000)
        }
    }, [user])

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <Logo />
                <h4>Register</h4>
                <FormRow
                    type="text"
                    name="name"
                    value={values.name}
                    handleChange={handleChange}
                />
                <FormRow
                    type="text"
                    name="lastName"
                    labelText="last name"
                    value={values.lastName}
                    handleChange={handleChange}
                />
                <FormRow
                    type="text"
                    name="location"
                    value={values.location}
                    handleChange={handleChange}
                />
                <FormRow
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                />
                <FormRow
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                />
                <button
                    type="submit"
                    className="btn btn-block undefined "
                    disabled={isLoading}
                >
                    {isLoading ? 'submitting' : 'submit'}
                </button>
                <p>
                    Already a member?
                    <Link className="member-btn" to="/login">
                        Login
                    </Link>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register
