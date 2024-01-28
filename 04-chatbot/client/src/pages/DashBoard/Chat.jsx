import { Outlet } from 'react-router-dom'
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
    Avatar,
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

const Chat = () => {
    const handleSubmit = (values) => {
        console.log(values)
    }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    return (
        <>
            <Content
                style={{
                    margin: '15px 100px 0',
                    overflow: 'initial',
                }}
            >
                <div
                    style={{
                        padding: '10px 10px 10px 10px',
                        textAlign: 'center',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </div>
            </Content>
            <Content
                style={{
                    margin: '15px 100px 0',
                    overflow: 'initial',
                }}
            >
                <Avatar icon={<RobotOutlined />} /> Bot
                <div
                    style={{
                        padding: '10px 10px 10px 10px',
                        textAlign: 'center',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <p>
                        long content asd asd asd Trong ví dụ này: Sự kiện
                        onKeyDown được sử dụng để kiểm tra xem phím nhấn là
                        Enter hay không và xác định xem phím Shift đã được nhấn
                        hay không (để phân biệt giữa Enter và Shift + Enter).
                        Nếu Enter được nhấn mà không có Shift, sự kiện mặc định
                        của Enter (xuống dòng) sẽ bị ngăn chặn
                        (e.preventDefault()) và hàm submit của form sẽ được gọi
                        (document.forms[0].submit()).
                        {
                            // indicates very long content
                            Array.from(
                                {
                                    length: 10,
                                },
                                (_, index) => (
                                    <React.Fragment key={index}>
                                        {index % 20 === 0 && index
                                            ? 'more'
                                            : '...'}
                                        <br />
                                    </React.Fragment>
                                )
                            )
                        }
                    </p>
                </div>
            </Content>
            <Content
                style={{
                    margin: '15px 100px 76px',
                    overflow: 'initial',
                }}
            >
                <Avatar icon={<img src={img} width={'14px'} />} /> Loi Tran
                <div
                    style={{
                        padding: '10px 10px 10px 10px',
                        textAlign: 'center',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <p>
                        long content asd asd asd Trong ví dụ này: Sự kiện
                        onKeyDown được sử dụng để kiểm tra xem phím nhấn là
                        Enter hay không và xác định xem phím Shift đã được nhấn
                        hay không (để phân biệt giữa Enter và Shift + Enter).
                        Nếu Enter được nhấn mà không có Shift, sự kiện mặc định
                        của Enter (xuống dòng) sẽ bị ngăn chặn
                        (e.preventDefault()) và hàm submit của form sẽ được gọi
                        (document.forms[0].submit()).
                        {
                            // indicates very long content
                            Array.from(
                                {
                                    length: 10,
                                },
                                (_, index) => (
                                    <React.Fragment key={index}>
                                        {index % 20 === 0 && index
                                            ? 'more'
                                            : '...'}
                                        <br />
                                    </React.Fragment>
                                )
                            )
                        }
                    </p>
                </div>
            </Content>
            <div
                style={{
                    margin: '0 16px 0 16px',
                    position: 'fixed',
                    overflow: 'auto',
                    left: '200px',
                    right: 0,
                    bottom: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    maxHeight: '150px',
                }}
            >
                <Form
                    style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                        margin: '10px 10px',
                        width: '50%',
                        borderRadius: '8px',
                    }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        style={{
                            flexGrow: 1,
                            overflowY: 'auto',
                            borderRadius: '8px',
                            border: 'solid 1px #ccc',
                        }}
                        name="content"
                    >
                        <Input.TextArea
                            style={{
                                border: 'none',
                                borderRadius: '8px',
                            }}
                            autoSize={{ minRows: 1, maxRows: 2000 }}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            htmlType="submit"
                            icon={<SendOutlined />}
                        ></Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default Chat
