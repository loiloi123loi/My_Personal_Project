import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow, FormRowSelect } from '../../components'
import { useEffect, useState } from 'react'
import {
    clearValues,
    editJob,
    getSingleJob,
    handleChange,
    hideLoadingEdit,
    showLoadingEdit,
} from '../../features/job/jobSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/Loading'

const EditJob = () => {
    const {
        isLoading,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        jobStatusOptions,
    } = useSelector((store) => store.job)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [isSubmit, setIsSubmit] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!position || !company || !jobLocation) {
            toast.error('Please fill out all fields')
            return
        }
        setIsSubmit(true)
        dispatch(
            editJob({
                jobId: id,
                job: { position, company, jobLocation, jobType, status },
                callback: () => navigate('/dashboard/all-jobs'),
            })
        )
    }

    const handleJobInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(handleChange({ name, value }))
    }

    useEffect(() => {
        dispatch(clearValues())
        dispatch(showLoadingEdit())
        setTimeout(() => {
            dispatch(getSingleJob(id))
        }, 500)
    }, [])

    if (isLoading && !isSubmit) {
        return <Loading />
    }

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h4 className="form-title">edit job</h4>
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

export default EditJob
