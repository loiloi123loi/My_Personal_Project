import { Link, Outlet } from 'react-router-dom'
import { SmallSidebar, Navbar } from '../../components'
import Wrapper from '../../assets/wrappers/SharedLayout'
import img from '../../assets/images/logo.ico'
import React, { useEffect, useRef, useState } from 'react'
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    MessageOutlined,
    PlusOutlined,
    RobotOutlined,
    SendOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons'
import {
    BackTop,
    Button,
    FloatButton,
    Form,
    Input,
    Layout,
    Menu,
    Skeleton,
    Space,
    Typography,
    theme,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { createNewChat, getAllChat } from '../../features/chat/chatSlice'
const { Header, Content, Footer, Sider } = Layout

const SharedLayout = () => {
    const { user } = useSelector((store) => store.user)
    const { isLoading, items } = useSelector((store) => store.chat)
    const [idChatSelected, setIdChatSelected] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllChat())
    }, [])

    return (
        <Wrapper>
            <Layout hasSider>
                <Sider className="my_sider">
                    <div className="logo">
                        <img src={img} />
                        <p>Web Chat</p>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[idChatSelected]}
                        items={items?.map((item) => ({
                            key: String(item.id),
                            icon: <MessageOutlined />,
                            label: `${item.chatname}`,
                        }))}
                        className="sider_menu"
                        disabled={isLoading}
                        onClick={(e) => {
                            setIdChatSelected(e.key)
                        }}
                    />
                    <div className="my_cre">
                        <Link to="/">
                            <Button
                                icon={<PlusOutlined />}
                                className="profile-btn"
                                onClick={() => {
                                    dispatch(createNewChat())
                                }}
                                htmlType="submit"
                            >
                                <Typography.Text ellipsis>
                                    Create New Chat
                                </Typography.Text>
                            </Button>
                        </Link>
                        <Link to="/my-profile">
                            <Button
                                icon={<img src={img} width={'20px'} />}
                                className="profile-btn"
                            >
                                <Typography.Text ellipsis>
                                    {user?.fullName}
                                </Typography.Text>
                            </Button>
                        </Link>
                        <p>Web Chat ©{new Date().getFullYear()}</p>
                        <p>Created by Loi Tran</p>
                    </div>
                </Sider>
                <Layout className="container">
                    <Outlet />
                </Layout>
            </Layout>
        </Wrapper>
    )
}

export default SharedLayout
