import { useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/JobsContainer'
import Job from './Job'
import PageBtnContainer from './PageBtnContainer'

const JobsContainer = () => {
    const { jobs, totalJobs, numOfPages, page } = useSelector(
        (store) => store.allJobs
    )

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
                {totalJobs} job{jobs.length > 1 && 's'} found ({numOfPages}{' '}
                page)
            </h5>
            <div className="jobs">
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default JobsContainer
