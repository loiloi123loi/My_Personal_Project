import { Link } from 'react-router-dom'
import FormRow from '../components/FormRow'
import Wrapper from '../assets/wrappers/LoginPage'
import { Form, Checkbox, Button, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const initialState = {
    usernameOrEmail: '',
    password: '',
    remember: true,
}
const Login = () => {
    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <Wrapper>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={initialState}
                onFinish={handleSubmit}
            >
                <Typography.Title className="title">Login</Typography.Title>
                <FormRow
                    name="usernameOrEmail"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username or Email"
                    type="email"
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
                    placeholder="Password"
                    type="password"
                />
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
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
                    Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        </Wrapper>
    )
}

export default Login
