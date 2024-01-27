import { Form, Typography, Button, Space } from 'antd'
import Wrapper from '../assets/wrappers/ForgotPasswordPage'
import FormRow from '../components/FormRow'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ResultDisplay from '../components/ResultDisplay'
import { useState } from 'react'

const items = {
    pending: {
        icon: <LoadingOutlined />,
        title: 'Processing',
        subTitle: 'We are sending a confirmation forgot message to your email',
    },
    fullfied: {
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
const ForgotPassword = () => {
    const [isSubmit, setIsSubmit] = useState('')
    const handleSubmit = (values) => {
        console.log(values)
    }

    if (Object.keys(items).includes(isSubmit)) {
        return (
            <Wrapper>
                <ResultDisplay {...items[isSubmit]} />
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <Form className="form" name="normal_login" onFinish={handleSubmit}>
                <Typography.Title className="title">
                    Forgot Password
                </Typography.Title>
                <FormRow
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Enter your email"
                    type="email"
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

export default ForgotPassword
