import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Button,
    Col,
    Form,
    Image,
    Input,
    Layout,
    Row,
    Select,
    Space,
    Typography,
    Upload,
    theme,
} from 'antd'
import {
    LogoutOutlined,
    SaveOutlined,
    UploadOutlined,
    UserOutlined,
} from '@ant-design/icons'
import FormRow from '../../components/FormRow'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileUser } from '../../features/user/userSlice'
import { toast } from 'react-toastify'
const { Header, Content, Footer, Sider } = Layout

const Profile = () => {
    const { isLoading, user } = useSelector((store) => store.user)
    const [form] = Form.useForm()
    const [avatarFile, setAvatarFile] = useState(null)
    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        let { phone } = values
        if (phone.length < 9 || phone.length > 10) {
            toast.error('Please provide valid phone')
            return
        }
        if (phone.length === 9) {
            phone = '0' + phone
        }
        dispatch(updateProfileUser({ ...values, avatar: avatarFile }))
    }
    const handleChange = (file) => {
        setAvatarFile(file)
        return false
    }
    useEffect(() => {
        if (user) {
            form.setFieldsValue(user)
        }
    }, [user])
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    return (
        <Content
            style={{
                margin: '15px 100px',
                overflow: 'initial',
                height: '96vh',
            }}
        >
            <Form form={form} onFinish={handleSubmit} disabled={isLoading}>
                <Space
                    style={{
                        padding: '20px 30px 10px 30px',
                        textAlign: 'center',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        display: 'block',
                    }}
                >
                    <div
                        style={{
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '20px',
                        }}
                    >
                        <div>
                            <Image
                                width={150}
                                src={
                                    user?.avatar
                                        ? user?.avatar
                                        : 'https://res.cloudinary.com/doeysdjl4/image/upload/v1706444138/avatar/ptcbhir4s3kkkuzsi0b0.avif'
                                }
                            />
                            <Typography.Title>
                                {user?.fullName}
                            </Typography.Title>
                        </div>
                        <Upload
                            name="avatar"
                            maxCount={1}
                            beforeUpload={handleChange}
                        >
                            <Button icon={<UploadOutlined />}>
                                Click to Upload
                            </Button>
                        </Upload>
                    </div>
                    <Row gutter={[16, 16]}>
                        <Col
                            span={7}
                            style={{ display: 'flex', justifyContent: 'right' }}
                        >
                            <Typography.Title level={5}>
                                First Name:
                            </Typography.Title>
                        </Col>
                        <Col span={12}>
                            <FormRow name="firstName" />
                        </Col>
                        <Col
                            span={7}
                            style={{ display: 'flex', justifyContent: 'right' }}
                        >
                            <Typography.Title level={5}>
                                Last Name:
                            </Typography.Title>
                        </Col>
                        <Col span={12}>
                            <FormRow name="lastName" />
                        </Col>
                        <Col
                            span={7}
                            style={{ display: 'flex', justifyContent: 'right' }}
                        >
                            <Typography.Title level={5}>
                                Username:
                            </Typography.Title>
                        </Col>
                        <Col span={12}>
                            <FormRow name="username" disabled={true} />
                        </Col>
                        <Col
                            span={7}
                            style={{ display: 'flex', justifyContent: 'right' }}
                        >
                            <Typography.Title level={5}>
                                Email:
                            </Typography.Title>
                        </Col>
                        <Col span={12}>
                            <FormRow name="email" disabled={true} />
                        </Col>
                        <Col
                            span={7}
                            style={{ display: 'flex', justifyContent: 'right' }}
                        >
                            <Typography.Title level={5}>
                                Phone:
                            </Typography.Title>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your phone number!',
                                    },
                                ]}
                            >
                                <Input
                                    addonBefore={
                                        <Form.Item
                                            name="prefix"
                                            noStyle
                                            initialValue={'84'}
                                        >
                                            <Select style={{ width: 70 }}>
                                                <Select.Option value="84">
                                                    +84
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    }
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col
                            span={24}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                htmlType="submit"
                                type="primary"
                                icon={<SaveOutlined />}
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Space>
            </Form>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'right',
                    marginTop: '20px',
                }}
            >
                <Button
                    icon={<LogoutOutlined />}
                    style={{ backgroundColor: 'red' }}
                >
                    Logout
                </Button>
            </div>
        </Content>
    )
}

export default Profile
