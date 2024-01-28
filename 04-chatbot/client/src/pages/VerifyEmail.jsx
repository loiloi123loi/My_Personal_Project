import { Link, useLocation, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/VerifyEmailPage'
import { LoadingOutlined } from '@ant-design/icons'
import ResultDisplay from '../components/ResultDisplay'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetIsSubmit, verifyEmailUser } from '../features/user/userSlice'

const items = {
    pending: {
        icon: <LoadingOutlined />,
        title: 'Processing',
        subTitle: 'We are processing your verifycation message',
    },
    fulfilled: {
        status: 'success',
        title: 'Success',
        subTitle: 'Verifycation successful, you can now log in',
    },
    rejected: {
        status: 'error',
        title: 'Error',
        subTitle: 'Verifycation failed',
    },
}
const VerifyEmail = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const paramsObject = {}
        for (const [key, value] of searchParams.entries()) {
            paramsObject[key] = value
        }
        dispatch(verifyEmailUser(paramsObject))
    }, [])

    const { isSubmit } = useSelector((store) => store.user)

    useEffect(() => {
        if (['fulfilled', 'rejected'].includes(isSubmit)) {
            setTimeout(() => {
                dispatch(resetIsSubmit())
                navigate('/')
            }, 3000)
        }
    }, [isSubmit])

    if (Object.keys(items).includes(isSubmit)) {
        return (
            <Wrapper>
                <ResultDisplay {...items[isSubmit]} />
            </Wrapper>
        )
    }
}

export default VerifyEmail
