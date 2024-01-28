import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import Wrapper from '../assets/wrappers/ResetPasswordPage'
import { useEffect, useState } from 'react'
import ResultDisplay from '../components/ResultDisplay'
import { Button, Form, Space, Typography } from 'antd'
import FormRow from '../components/FormRow'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetIsSubmit, resetPasswordUser } from '../features/user/userSlice'

const items = {
    pending: {
        icon: <LoadingOutlined />,
        title: 'Processing',
        subTitle:
            'We are sending a confirmation reset password message to your email',
    },
    fulfilled: {
        status: 'success',
        title: 'Success',
        subTitle:
            'We have sent a confirmation message to your email, please go to your inbox and follow the instructions',
    },
    rejected: {
        status: 'error',
        title: 'Error',
        subTitle:
            'Failure to send a confirmation message to your email address, please contact support',
    },
}
const initialState = {
    token: '',
    email: '',
    password: '',
}
const ResetPassword = () => {
    const [form] = Form.useForm()
    const { isSubmit } = useSelector((store) => store.user)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (values) => {
        dispatch(resetPasswordUser(values))
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const objParams = {}
        for (const [key, value] of params.entries()) {
            objParams[key] = value
        }
        form.setFieldsValue({ ...objParams })
    }, [location])

    useEffect(() => {
        if (['fulfilled', 'rejected'].includes(isSubmit)) {
            setTimeout(() => {
                dispatch(resetIsSubmit())
                navigate('/landing')
            }, 3000)
        }
    }, [isSubmit])

    if (Object.keys(items).includes(isSubmit)) {
        return (
            <Wrapper>
                <ResultDisplay {...items[isSubmit]} />
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={initialState}
                onFinish={handleSubmit}
            >
                <Typography.Title className="title">
                    Reset password
                </Typography.Title>
                <Form.Item hidden>
                    <FormRow name="token" />
                </Form.Item>
                <FormRow
                    name="email"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    type="email"
                    disabled={true}
                />
                <FormRow
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="New Password"
                    type="password"
                />
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Submit
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Link className="login-form-forgot" to="/register">
                            Register
                        </Link>
                        Or
                        <Link className="login-form-forgot" to="/login">
                            Login
                        </Link>
                    </Space>
                </Form.Item>
            </Form>
        </Wrapper>
    )
}

export default ResetPassword
