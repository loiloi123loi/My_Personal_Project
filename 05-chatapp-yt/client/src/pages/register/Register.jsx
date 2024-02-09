import { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import useRegister from '../../hooks/useRegister'

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
}
const Register = () => {
    const [inputs, setInputs] = useState(initialState)
    const { loading, register } = useRegister()
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs({
            ...inputs,
            [name]: value,
        })
    }
    const handleCheckboxGender = (gender) => {
        setInputs({
            ...inputs,
            gender,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { gender } = inputs
        if (!gender) {
            toast.error('Please provide your gender')
            return
        }
        await register(inputs)
    }

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Sign Up <span className="text-blue-500"> ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                Full Name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Loi Tran"
                            className="w-full input input-bordered h-10"
                            value={inputs.fullName}
                            name="fullName"
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div>
                        <label className="label p-2 ">
                            <span className="text-base label-text">
                                Username
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="loitran"
                            className="w-full input input-bordered h-10"
                            value={inputs.username}
                            name="username"
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full input input-bordered h-10"
                            value={inputs.password}
                            name="password"
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">
                                Confirm Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full input input-bordered h-10"
                            value={inputs.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <GenderCheckbox
                        handleCheckboxGender={handleCheckboxGender}
                        value={inputs.gender}
                    />
                    <Link
                        to="/login"
                        className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
                    >
                        Already have an account?
                    </Link>
                    <div>
                        <button
                            className="btn btn-block btn-sm mt-2 border border-slate-700"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
