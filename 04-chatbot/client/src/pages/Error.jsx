import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/images/not-found.svg'

const Error = () => {
    const navigate = useNavigate()
    const [second, setSecond] = useState(5)
    useEffect(() => {
        if (second == 0) {
            navigate('/')
            return
        }
        setTimeout(() => {
            setSecond(second - 1)
        }, 1000)
    }, [second])

    return (
        <Wrapper className="full-page">
            <div>
                <img src={img} alt="not found" />
                <h3>Ohh! Page Not Found</h3>
                <p>we can't seem to find the page you are looking for</p>
                <Link to="/">
                    back home (After {second}{' '}
                    {second > 1 ? 'seconds' : 'second'})
                </Link>
            </div>
        </Wrapper>
    )
}

export default Error
