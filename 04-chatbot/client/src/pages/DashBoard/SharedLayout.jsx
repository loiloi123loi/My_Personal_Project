import { Link, Outlet } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import img from '../../assets/images/logo.ico'
import React, { useEffect, useState } from 'react'
import {
    DeleteOutlined,
    EditOutlined,
    MessageOutlined,
    PlusOutlined,
    SaveFilled,
} from '@ant-design/icons'
import { Button, Form, Input, Layout, Menu, Popconfirm, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
    createNewChat,
    deleteChat,
    editChatname,
    getAllChat,
    handleEdit,
    setIdChatSelected,
} from '../../features/chat/chatSlice'
const { Sider } = Layout

const SharedLayout = () => {
    const { user } = useSelector((store) => store.user)
    const { isLoading, isEdit, items, idChatSelected } = useSelector(
        (store) => store.chat
    )
    const [chatnameEdit, setChatnameEdit] = useState('')
    const dispatch = useDispatch()
    const handleSave = (e) => {
        e.preventDefault()
        if (isEdit) {
            dispatch(editChatname({ id: idChatSelected, name: chatnameEdit }))
        }
    }
    const handleDeleteClick = (id) => {
        dispatch(deleteChat(id))
    }
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
                    <form onSubmit={handleSave}>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={[idChatSelected]}
                            className="sider_menu"
                            disabled={isLoading}
                            onClick={(e) => {
                                dispatch(setIdChatSelected(e.key))
                            }}
                            items={items?.map((item) => ({
                                key: String(item.id),
                                label: (
                                    <React.Fragment>
                                        {idChatSelected === String(item.id) &&
                                        isEdit ? (
                                            <>
                                                <input
                                                    defaultValue={item.chatname}
                                                    style={{
                                                        maxWidth: '78px',
                                                    }}
                                                    onChange={(e) =>
                                                        setChatnameEdit(
                                                            e.target.value
                                                        )
                                                    }
                                                    name="chatname"
                                                />
                                                <Button
                                                    type="text"
                                                    htmlType="submit"
                                                    style={{
                                                        color: '#fff',
                                                    }}
                                                    icon={<SaveFilled />}
                                                ></Button>
                                            </>
                                        ) : (
                                            <>
                                                {item.chatname.length > 11
                                                    ? item.chatname.slice(0, 10)
                                                    : item.chatname}
                                                <Button
                                                    type="text"
                                                    style={{ color: '#fff' }}
                                                    icon={<EditOutlined />}
                                                    onClick={(e) => {
                                                        setChatnameEdit(
                                                            item.chatname
                                                        )
                                                        e.preventDefault()
                                                        dispatch(
                                                            handleEdit(
                                                                String(item.id)
                                                            )
                                                        )
                                                    }}
                                                ></Button>
                                            </>
                                        )}
                                        <Popconfirm
                                            title="Delete the chat"
                                            description="Are you sure to delete this chat?"
                                            onConfirm={(e) =>
                                                handleDeleteClick(item.id)
                                            }
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button
                                                type="text"
                                                style={{ color: '#fff' }}
                                                icon={<DeleteOutlined />}
                                            ></Button>
                                        </Popconfirm>
                                    </React.Fragment>
                                ),
                            }))}
                        ></Menu>
                    </form>
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
                                icon={
                                    <img
                                        src={
                                            user?.avatar
                                                ? user.avatar
                                                : 'https://res.cloudinary.com/doeysdjl4/image/upload/v1706444138/avatar/ptcbhir4s3kkkuzsi0b0.avif'
                                        }
                                        width={'20px'}
                                    />
                                }
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
