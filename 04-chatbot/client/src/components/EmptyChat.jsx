import React from 'react'
import { Avatar, Layout, Typography, theme } from 'antd'
import { RobotOutlined } from '@ant-design/icons'
const { Content } = Layout

const EmptyChat = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    return (
        <>
            <Content className="chat_loading">
                <div
                    style={{
                        padding: '10px 10px 10px 10px',
                        textAlign: 'center',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <p>
                        My web chat application is more than just a chat usual
                        thing. It was built with the goal of creating a unique,
                        smart and convenient interactive experience. Key
                        features of the app include the ability to reply to
                        questions Diverse questions, providing detailed
                        information and even Perform specific tasks according to
                        user requirements.
                    </p>
                </div>
                <div
                    style={{
                        padding: '10px 10px 10px 10px',
                        textAlign: 'center',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <p>
                        One What's unique about the app is its ability to
                        understand context conversation. My AI isn't just good
                        at understanding specific questions, but also the
                        ability to recognize context around and give appropriate
                        answers. This creates a natural sense of communication,
                        like I'm speaking talk to a real person. Can users enjoy
                        it? only the information that AI provides, but also
                        entertainment and interesting in conversation.
                    </p>
                </div>
                <div
                    style={{
                        padding: '10px 10px 10px 10px',
                        textAlign: 'center',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <p>
                        The application also supports many language, helping to
                        connect and communicate with users all over world.
                        Another notable feature is customization capabilities
                        application adjustments. Users can ask questions and
                        make requests specific information, and can even
                        personalize the experience them through the settings
                        options. This helps The application becomes a useful and
                        versatile tool for many different purposes.
                    </p>
                </div>
            </Content>
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
                    <h4>
                        Usage steps: Select the created chat or create a new
                        chat {'->'} Enter the content to discuss {'->'} Click
                        the button with the send icon to send the content
                    </h4>
                </div>
            </Content>
        </>
    )
}

export default EmptyChat
