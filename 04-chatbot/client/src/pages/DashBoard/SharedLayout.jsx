import { Link, Outlet } from 'react-router-dom'
import { SmallSidebar, Navbar } from '../../components'
import Wrapper from '../../assets/wrappers/SharedLayout'
import img from '../../assets/images/logo.ico'
import React, { useEffect, useRef } from 'react'
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
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
const { Header, Content, Footer, Sider } = Layout
const items = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
    ShopOutlined,
    ShopOutlined,
    ShopOutlined,
    ShopOutlined,
    ShopOutlined,
    ShopOutlined,
    ShopOutlined,
    ShopOutlined,
    ShopOutlined,
    ShopOutlined,
    ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}))

const SharedLayout = () => {
    const handleSubmit = (values) => {
        console.log(values)
    }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

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
                        defaultSelectedKeys={['1']}
                        items={items}
                        className="sider_menu"
                    />
                    <div className="my_cre">
                        <Link to="/">
                            <Button
                                icon={<PlusOutlined />}
                                className="profile-btn"
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
                                    Loi Tran
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
