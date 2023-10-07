import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../assets/wrappers/StatsContainer'
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa'
import StatItem from '../../components/StatItem'
import { useEffect, useState } from 'react'
import { getInfoAdmin } from '../../features/user/userSlice'

const Admin = () => {
    const { data } = useSelector((store) => store.user)
    const dispatch = useDispatch()

    const defaultStats = [
        {
            title: 'current users',
            count: data.users || 0,
            icon: <FaSuitcaseRolling />,
            color: 'rgb(245, 158, 11)',
            bcg: 'rgb(254, 243, 199)',
        },
        {
            title: 'total jobs',
            count: data.jobs || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9',
        },
    ]

    useEffect(() => {
        dispatch(getInfoAdmin())
    }, [])

    return (
        <Wrapper>
            {defaultStats.map((item, index) => {
                return <StatItem key={index} {...item} />
            })}
        </Wrapper>
    )
}

export default Admin
