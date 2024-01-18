import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { changePage } from '../features/allJobs/allJobSlice'

const PageBtnContainer = () => {
    const { numOfPages, page } = useSelector((store) => store.allJobs)
    const dispatch = useDispatch()

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1
    })

    const nextPage = () => {
        let newPage = page + 1
        if (newPage > numOfPages) {
            newPage = 1
        }
        dispatch(changePage(newPage))
    }
    const prevPage = () => {
        let newPage = page - 1
        if (newPage < 1) {
            newPage = numOfPages
        }
        dispatch(changePage(newPage))
    }

    return (
        <Wrapper>
            <button type="button" className="btn prev-btn" onClick={prevPage}>
                <HiChevronDoubleLeft />
                prev
            </button>
            <div className="btn-container">
                {pages.map((index, key) => {
                    let pageNumber = pages[key]
                    const padding = 3
                    if (pageNumber >= 3 && pageNumber < page - padding) return
                    if (pageNumber > page + padding) return
                    let textLabel = ''
                    if (
                        (pageNumber === page - padding ||
                            pageNumber === page + padding) &&
                        pageNumber > 2
                    )
                        textLabel = '...'
                    return (
                        <button
                            type="button"
                            key={pageNumber}
                            className={
                                pageNumber === page
                                    ? 'btn pageBtn active'
                                    : 'btn pageBtn false'
                            }
                            onClick={() => dispatch(changePage(pageNumber))}
                        >
                            {textLabel ? textLabel : pageNumber}
                        </button>
                    )
                })}
            </div>
            <button type="button" className="btn next-btn" onClick={nextPage}>
                next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    )
}

export default PageBtnContainer
