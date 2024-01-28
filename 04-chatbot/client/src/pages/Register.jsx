import { Button, Checkbox, Form, Typography } from 'antd'
import {
    UserOutlined,
    LockOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons'
import Wrapper from '../assets/wrappers/RegisterPage'
import FormRow from '../components/FormRow'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/user/userSlice'

const initialState = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    agree_term: false,
}
const Register = () => {
    const { isLoading } = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        dispatch(registerUser(values))
    }
    const handleConfirmPass = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
            }
            return Promise.reject(
                new Error('The confirm password do not match!')
            )
        },
    })

    return (
        <Wrapper>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={initialState}
                onFinish={handleSubmit}
                disabled={isLoading}
            >
                <Typography.Title className="title">Register</Typography.Title>
                <FormRow
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name!',
                        },
                    ]}
                    prefix={
                        <InfoCircleOutlined className="site-form-item-icon" />
                    }
                    placeholder="First Name"
                />
                <FormRow
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                        },
                    ]}
                    prefix={
                        <InfoCircleOutlined className="site-form-item-icon" />
                    }
                    placeholder="Last name"
                />
                <FormRow
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                    prefix={
                        <InfoCircleOutlined className="site-form-item-icon" />
                    }
                    placeholder="Username"
                />
                <FormRow
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                    type="email"
                />
                <FormRow
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                    type="password"
                />
                <FormRow
                    name="repeatPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your confirm password!',
                        },
                        handleConfirmPass,
                    ]}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Confirm Password"
                    type="password"
                    hasFeedback={true}
                />
                <Form.Item>
                    <Form.Item
                        name="agree_term"
                        valuePropName="checked"
                        noStyle
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  'Should accept agreement'
                                              )
                                          ),
                            },
                        ]}
                    >
                        <Checkbox>I agree to the terms</Checkbox>
                    </Form.Item>

                    <Link className="login-form-forgot" to="/forgot-password">
                        Forgot password
                    </Link>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Submit
                    </Button>
                    Or <Link to="/login">login now!</Link>
                </Form.Item>
            </Form>
        </Wrapper>
    )
}

export default Register
