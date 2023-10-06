import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow, FormRowSelect } from '../../components'
import { addJob, clearValues, handleChange } from '../../features/job/jobSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

const AddJob = () => {
    const {
        isLoading,
        position,
        company,
        jobLocation,
        jobStatusOptions,
        status,
        jobTypeOptions,
        jobType,
    } = useSelector((store) => store.job)
    const { user } = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleJobInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(handleChange({ name, value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!position || !company || !jobLocation || !status || !jobType) {
            toast.error(`Fill out all fields`)
            return
        }
        dispatch(
            addJob({
                job: {
                    position,
                    company,
                    jobLocation,
                    status,
                    jobType,
                },
                callback: navigateAllJob,
            })
        )
    }

    const navigateAllJob = () => {
        navigate('/dashboard/all-jobs')
    }

    useEffect(() => {
        dispatch(clearValues())
        dispatch(
            handleChange({
                name: 'jobLocation',
                value: user?.location || '',
            })
        )
    }, [user, location])

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h4 className="form-title">add job</h4>
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="position"
                        value={position}
                        required={true}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type="text"
                        name="company"
                        value={company}
                        required={true}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type="text"
                        name="jobLocation"
                        labelText="job location"
                        value={jobLocation}
                        required={true}
                        handleChange={handleJobInput}
                    />
                    <FormRowSelect
                        type="text"
                        name="status"
                        labelText="job status"
                        value={status}
                        list={jobStatusOptions}
                        handleChange={handleJobInput}
                    />
                    <FormRowSelect
                        type="text"
                        name="jobType"
                        labelText="job type"
                        value={jobType}
                        list={jobTypeOptions}
                        handleChange={handleJobInput}
                    />
                    <button
                        type="submit"
                        className="btn btn-block submit-btn"
                        disabled={isLoading}
                    >
                        submit
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddJob
