import Wrapper from '../assets/wrappers/SearchContainer'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import { useDispatch, useSelector } from 'react-redux'
import { clearFilters, handleChange } from '../features/allJobs/allJobSlice'

const SearchContainer = () => {
    const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
        useSelector((store) => store.allJobs)
    const { jobTypeOptions, jobStatusOptions } = useSelector(
        (store) => store.job
    )
    const dispatch = useDispatch()

    const handleSearch = (e) => {
        if (isLoading) return
        dispatch(handleChange({ name: e.target.name, value: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(clearFilters())
    }

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h5 className="form-title">search form</h5>
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="search"
                        value={search}
                        handleChange={handleSearch}
                    />
                    <FormRowSelect
                        type="text"
                        labelText="job status"
                        name="searchStatus"
                        value={searchStatus}
                        list={['all', ...jobStatusOptions]}
                        handleChange={handleSearch}
                    />
                    <FormRowSelect
                        type="text"
                        labelText="job type"
                        name="searchType"
                        value={searchType}
                        list={['all', ...jobTypeOptions]}
                        handleChange={handleSearch}
                    />
                    <FormRowSelect
                        type="text"
                        name="sort"
                        value={sort}
                        list={sortOptions}
                        handleChange={handleSearch}
                    />
                    <button
                        className="btn form-btn delete-btn"
                        disabled={isLoading}
                    >
                        Reset Search Values
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default SearchContainer
