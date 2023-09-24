import Wrapper from '../assets/wrappers/JobsContainer'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import { useEffect } from 'react'
import { getAllJobs } from '../features/allJobs/allJobSlice'
import Job from './Job'
import PageBtnContainer from './PageBtnContainer'

const JobsContainer = () => {
    const {
        jobs,
        isLoading,
        page,
        totalJobs,
        numOfPages,
        search,
        status,
        jobType,
        sort,
    } = useSelector((store) => store.allJobs)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllJobs())
    }, [page, search, status, jobType, sort])

    if (isLoading) {
        return <Loading center={true} />
    }

    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <h5>
                {totalJobs} job{jobs.length > 1 ? 's' : ''} found
            </h5>
            <div className="jobs">
                {jobs.map((item, id) => {
                    return <Job key={item.id || id} {...item} />
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default JobsContainer
