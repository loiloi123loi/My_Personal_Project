import { RobotOutlined } from '@ant-design/icons'
import { Avatar, Layout, theme } from 'antd'
import React from 'react'
const { Content } = Layout

const ChatItem = ({ icon, who, content, className }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()
    return (
        <Content className={className}>
            <Avatar icon={icon} /> {who}
            <div
                style={{
                    padding: '10px 10px 10px 10px',
                    textAlign: 'center',
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <p>{content}</p>
            </div>
        </Content>
    )
}

export default ChatItem
