import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = [
    { id: 1, text: 'add job', path: '/', icon: <FaWpforms /> },
    {
        id: 2,
        text: 'all jobs',
        path: '/all-jobs',
        icon: <MdQueryStats />,
    },
    {
        id: 3,
        text: 'stats',
        path: '/stats',
        icon: <IoBarChartSharp />,
    },
    { id: 4, text: 'profile', path: '/profile', icon: <ImProfile /> },
]

export default links
