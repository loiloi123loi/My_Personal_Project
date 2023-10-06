import { useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/StatsContainer'
import StatItem from './StatItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'

const StatsContainer = () => {
    const { stats } = useSelector((store) => store.allJobs)
    const defaultStats = [
        {
            title: 'pending applications',
            count: stats.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: 'rgb(245, 158, 11)',
            bcg: 'rgb(254, 243, 199)',
        },
        {
            title: 'interviews scheduled',
            count: stats.interview || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9',
        },
        {
            title: 'jobs declined',
            count: stats.declined || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee',
        },
    ]

    return (
        <Wrapper>
            {defaultStats.map((item, index) => {
                return <StatItem key={index} {...item} />
            })}
        </Wrapper>
    )
}

export default StatsContainer
