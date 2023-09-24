import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow, FormRowSelect } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import {
    handleChange,
    clearValues,
    createJob,
    editJob,
} from '../../features/job/jobSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const AddJob = () => {
    const {
        isLoading,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        isEditing,
        editJobId,
    } = useSelector((store) => store.job)
    const { user } = useSelector((store) => store.user)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!position || !company || !jobLocation || !status || !jobType) {
            toast.error('Please provide all fields')
            return
        }
        if (!isEditing) {
            dispatch(
                createJob({
                    position,
                    company,
                    jobLocation,
                    status,
                    jobType,
                })
            )
            return
        }
        dispatch(
            editJob({
                jobId: editJobId,
                job: {
                    position,
                    company,
                    jobLocation,
                    status,
                    jobType,
                },
            })
        )
    }

    const handleChangeInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(handleChange({ name, value }))
    }

    useEffect(() => {
        if (!isEditing) {
            dispatch(
                handleChange({
                    name: 'jobLocation',
                    value: user.location,
                })
            )
        }
    }, [])

    return (
        <Wrapper>
            <form className="form">
                <h3>{!isEditing ? 'add job' : 'edit job'}</h3>
                <div className="form-center">
                    {/* position */}
                    <FormRow
                        type="text"
                        name="position"
                        value={position}
                        handleChange={handleChangeInput}
                    />
                    {/* company */}
                    <FormRow
                        type="text"
                        name="company"
                        value={company}
                        handleChange={handleChangeInput}
                    />
                    {/* location */}
                    <FormRow
                        type="text"
                        name="jobLocation"
                        value={jobLocation}
                        labelText="job location"
                        handleChange={handleChangeInput}
                    />
                    {/* status */}
                    <FormRowSelect
                        name="status"
                        value={status}
                        handleChange={handleChangeInput}
                        list={statusOptions}
                    />
                    {/* job type */}
                    <FormRowSelect
                        name="jobType"
                        labelText="job type"
                        value={jobType}
                        handleChange={handleChangeInput}
                        list={jobTypeOptions}
                    />
                    <div className="btn-container">
                        <button
                            type="button"
                            className="btn btn-block clear-btn"
                            onClick={() => dispatch(clearValues())}
                        >
                            clear
                        </button>
                        <button
                            type="submit"
                            className="btn btn-block submit-btn"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddJob
