import Wrapper from '../assets/wrappers/LandingPage'
import { Button, Carousel, Space, Typography } from 'antd'
import CarouselItem from '../components/CarouselItem'
import imgs from '../utils/landingImage'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <Wrapper>
            <Carousel autoplay className="carousel">
                {imgs.map((item) => {
                    return <CarouselItem key={item.id} {...item} />
                })}
            </Carousel>
            <div className="welcome">
                <Typography.Title className="welcome-line">
                    Welcome, Web Chat
                </Typography.Title>
                <Typography.Text className="welcome-line">
                    Welcome to AI Chat! Our user-friendly interface makes it
                    easy for you to interact with artificial intelligence.
                    Explore and chat with the AI to ask questions, receive
                    information, or simply engage in interesting conversations.
                    Experience it now and discover the world of artificial
                    intelligence!
                </Typography.Text>
                <Space className="welcome-line">
                    <Link to="/register">
                        <Button type="primary">Register</Button>
                    </Link>
                    <Link to="/login">
                        <Button type="primary">Login</Button>
                    </Link>
                </Space>
            </div>
        </Wrapper>
    )
}

export default Landing
