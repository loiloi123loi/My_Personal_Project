import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showStats } from '../../features/allJobs/allJobSlice'
import ChartsContainer from '../../components/ChartsContainer'
import StatsContainer from '../../components/StatsContainer'

const Stats = () => {
    const dispatch = useDispatch()

    const { monthlyApplications } = useSelector((store) => store.allJobs)

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
