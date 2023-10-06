import StatsContainer from '../../components/StatsContainer'
import ChartsContainer from '../../components/ChartsContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { showStats } from '../../features/allJobs/allJobSlice'

const Stats = () => {
    const { monthlyApplications } = useSelector((store) => store.allJobs)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showStats())
    }, [])

    return (
        <>
            <StatsContainer />
            {monthlyApplications.length > 0 && <ChartsContainer />}
        </>
    )
}

export default Stats
