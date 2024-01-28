import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Button,
    Col,
    Form,
    Image,
    Layout,
    Row,
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
import { useSelector } from 'react-redux'
const { Header, Content, Footer, Sider } = Layout

const props = {
    name: 'avatar',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    maxCount: 1,
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
        } else if (info.file.status === 'error') {
        }
    },
}
const Profile = () => {
    const { isLoading, user } = useSelector((store) => store.user)
    const [form] = Form.useForm()
    const [avatarFile, setAvatarFile] = useState(null)
    const handleSubmit = (values) => {
        console.log({ ...values, avatar: avatarFile })
    }
    const handleChange = (e) => {
        if (e.file.status === 'done') {
            setAvatarFile(e.file)
        }
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
                            {...props}
                            onChange={handleChange}
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
                            <FormRow name="firstName" value={user?.firstName} />
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
                            <FormRow name="lastName" value={user?.lastName} />
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
                            <FormRow name="username" value={user?.username} />
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
                            <FormRow name="email" value={user?.email} />
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
                            <FormRow name="phone" value={user?.phone} />
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
