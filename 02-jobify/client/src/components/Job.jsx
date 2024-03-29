import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from 'react-icons/fa'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteJob } from '../features/job/jobSlice'

const Job = ({
    _id,
    company,
    position,
    status,
    jobType,
    jobLocation,
    createdAt,
}) => {
    const dispatch = useDispatch()
    const date = moment(createdAt).format('MMM Do, YYYY')

    return (
        <Wrapper>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5>{position}</h5>
                    <p>{jobLocation}</p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className="actions">
                        <Link
                            to={`/dashboard/edit-job/${_id}`}
                            className="btn edit-btn"
                        >
                            edit
                        </Link>
                        <button
                            type="button"
                            className="btn delete-btn"
                            onClick={() => dispatch(deleteJob(_id))}
                        >
                            delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    )
}

export default Job
