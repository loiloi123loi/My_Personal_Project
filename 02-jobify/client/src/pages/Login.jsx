import Wrapper from '../assets/wrappers/LoginPage'
import Logo from '../components/Logo'
import FormRow from '../components/FormRow'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { currentUser, loginUser } from '../features/user/userSlice'

const initialState = {
    email: '',
    password: '',
}

const Login = () => {
    const [values, setValues] = useState(initialState)
    const { isLoading, isLogin, user } = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = values
        if (!email || !password) {
            toast.error('Please fill out all fields')
            return
        }
        dispatch(loginUser({ email, password }))
    }

    useEffect(() => {
        if (user) {
            toast.success(`Welcom back, ${user?.name}`)
            setTimeout(() => {
                navigate('/dashboard/')
            }, 1000)
        }
    }, [user])

    useEffect(() => {
        if (isLogin === true) {
            setTimeout(() => {
                dispatch(currentUser())
            }, 1000)
        }
    }, [isLogin])

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <Logo />
                <h4>login</h4>
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
                <button type="button" className="btn btn-block">
                    explore the app
                </button>
                <p>
                    Not a member yet?
                    <Link className="member-btn" to="/register">
                        Register
                    </Link>
                </p>
            </form>
        </Wrapper>
    )
}

export default Login
