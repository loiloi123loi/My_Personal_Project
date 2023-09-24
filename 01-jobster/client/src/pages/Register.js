import { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo, FormRow } from '../components';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../features/user/userSlice';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
};

function Register() {
    const [values, setValues] = useState(initialState);
    const { user, isLoading } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({ ...values, [name]: value });
    };

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            toast.error('Please fill out of all fields');
            return;
        }
        if (isMember) {
            dispatch(loginUser({ email, password }));
            return;
        }
        dispatch(registerUser({ name, email, password }));
    };

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'login' : 'register'}</h3>
                {!values.isMember && (
                    <FormRow
                        type="text"
                        name="name"
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}
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
                    className="btn btn-block"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'submit'}
                </button>
                <button
                    type="button"
                    className="btn btn-block btn-hipster"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'demo app'}
                </button>
                <p>
                    {values.isMember
                        ? 'Not a member yet?'
                        : 'Already a member?'}
                    <button
                        type="button"
                        className="member-btn"
                        onClick={toggleMember}
                    >
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
}

export default Register;
