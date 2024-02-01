import React, { useEffect, useRef } from 'react'
import { RobotOutlined, SendOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, Layout, Skeleton, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
    addAskUser,
    getAllHistory,
    newAsk,
} from '../../features/history/historySlice'
import EmptyChat from '../../components/EmptyChat'
import ChatItem from '../../components/ChatItem'
const { Content } = Layout

const Chat = () => {
    const [form] = Form.useForm()
    const { user } = useSelector((store) => store.user)
    const { idChatSelected } = useSelector((store) => store.chat)
    const { isLoading, histories } = useSelector((store) => store.history)
    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        dispatch(
            addAskUser({
                who: 'user',
                content: values.content,
            })
        )
        dispatch(newAsk({ ...values, chatId: idChatSelected }))
    }
    useEffect(() => {
        if (idChatSelected) {
            dispatch(getAllHistory(idChatSelected))
        }
    }, [idChatSelected])
    useEffect(() => {
        if (idChatSelected !== '') {
            form.setFieldsValue({
                content: '',
            })
        }
    }, [histories])
    const item_end = useRef()
    useEffect(() => {
        if (item_end.current) {
            item_end.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
            })
        }
    }, [histories])

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    if (idChatSelected === '') {
        return <EmptyChat />
    }

    return (
        <>
            {isLoading && histories?.length === 0 && (
                <Content className="chat_loading">
                    <div
                        className="chat_item_block"
                        style={{
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
            )}
            <div ref={item_end}>
                {histories?.length > 0 &&
                    histories.map((history, index) => {
                        const objData = {
                            icon: <Avatar icon={<RobotOutlined />} />,
                            content: history.content,
                            who: 'Bot',
                        }
                        if (history.who === 'user') {
                            objData.who = user?.fullName
                            objData.icon = (
                                <Avatar
                                    icon={
                                        <img
                                            src={
                                                user?.avatar
                                                    ? user.avatar
                                                    : 'https://res.cloudinary.com/doeysdjl4/image/upload/v1706444138/avatar/ptcbhir4s3kkkuzsi0b0.avif'
                                            }
                                            width={'14px'}
                                        />
                                    }
                                />
                            )
                        }
                        return (
                            <ChatItem
                                key={index}
                                {...objData}
                                className={
                                    index < histories.length - 1
                                        ? 'chat_loading'
                                        : 'chat_loading chat_in_the_end'
                                }
                                ref={
                                    index === histories.length - 1
                                        ? item_end
                                        : undefined
                                }
                            />
                        )
                    })}
            </div>
            <div className="chat_form_area">
                <Form
                    form={form}
                    className="form_chat"
                    onFinish={handleSubmit}
                    disabled={isLoading}
                >
                    <Form.Item
                        className="form_chat_item"
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
