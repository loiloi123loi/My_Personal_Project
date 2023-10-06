import SearchContainer from '../../components/SearchContainer'
import JobsContainer from '../../components/JobsContainer'
import Loading from '../../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { getAllJobs } from '../../features/allJobs/allJobSlice'

const AllJobs = () => {
    const { isLoading, page, search, searchStatus, searchType, sort } =
        useSelector((store) => store.allJobs)
    const dispatch = useDispatch()
    const timeoutRef = useRef(null)

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            dispatch(getAllJobs())
        }, 3000)
    }, [search, searchStatus, searchType, sort])

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = dispatch(getAllJobs())
    }, [page])

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <SearchContainer />
            <JobsContainer />
        </>
    )
}

export default AllJobs
