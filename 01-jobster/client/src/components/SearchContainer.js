import Wrapper from '../assets/wrappers/SearchContainer'
import { FormRow, FormRowSelect } from '.'
import { useSelector, useDispatch } from 'react-redux'
import { handleChange, clearFilters } from '../features/allJobs/allJobSlice'

const SearchContainer = () => {
    const { isLoading, search, status, type, sort, sortOptions } = useSelector(
        (store) => store.allJobs
    )

    const { jobTypeOptions, statusOptions } = useSelector((store) => store.job)

    const dispatch = useDispatch()

    const handleSearch = (e) => {
        if (isLoading) return
        const name = e.target.name
        const value = e.target.value
        dispatch(handleChange({ name, value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(clearFilters())
    }

    return (
        <Wrapper>
            <form className="form">
                <h4>search form</h4>
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="search"
                        value={search}
                        handleChange={(e) => handleSearch(e)}
                    />
                    <FormRowSelect
                        labelText="status"
                        name="status"
                        value={status}
                        list={['all', ...statusOptions]}
                        handleChange={(e) => handleSearch(e)}
                    />
                    <FormRowSelect
                        labelText="type"
                        name="jobType"
                        value={type}
                        list={['all', ...jobTypeOptions]}
                        handleChange={(e) => handleSearch(e)}
                    />
                    <FormRowSelect
                        name="sort"
                        value={sort}
                        list={sortOptions}
                        handleChange={(e) => handleSearch(e)}
                    />
                    <button
                        className="btn btn-block btn-danger"
                        disabled={isLoading}
                        onClick={(e) => handleSubmit(e)}
                    >
                        clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default SearchContainer
