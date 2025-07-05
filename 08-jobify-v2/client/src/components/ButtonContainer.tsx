import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

interface IButtonContainerProps {
  currentPage: number
  totalPages: number
}
interface IPageButtonProps {
  page: number
  activeClass: boolean
}

const ButtonContainer = ({ currentPage, totalPages }: IButtonContainerProps) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const handlePageChange = useCallback(
    (page: number) => {
      const defaultParams = {
        ...searchParams,
        search: searchParams.get('search') || '',
        status: searchParams.get('status') || 'all',
        limit: searchParams.get('limit') || '10',
        page: String(page)
      }
      const params = new URLSearchParams(defaultParams)
      navigate(`${pathname}?${params.toString()}`)
    },
    [navigate, pathname, searchParams]
  )
  const addPageButton = useCallback(
    ({ page, activeClass }: IPageButtonProps) => {
      return (
        <Button
          key={page}
          size="icon"
          variant={activeClass ? 'default' : 'outline'}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      )
    },
    [handlePageChange]
  )
  const renderPageButtons = useMemo(() => {
    const pageButtons = []
    pageButtons.push(addPageButton({ page: 1, activeClass: currentPage === 1 }))
    if (currentPage > 3) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-1">
          ...
        </Button>
      )
    }
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          page: currentPage - 1,
          activeClass: false
        })
      )
    }
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({
          page: currentPage,
          activeClass: true
        })
      )
    }
    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(
        addPageButton({
          page: currentPage + 1,
          activeClass: false
        })
      )
    }
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-1">
          ...
        </Button>
      )
    }
    pageButtons.push(
      addPageButton({
        page: totalPages,
        activeClass: currentPage === totalPages
      })
    )
    return pageButtons
  }, [addPageButton, currentPage, totalPages])

  return (
    <div className="flex gap-x-2">
      <Button
        className="flex items-center gap-x-2 capitalize"
        variant="outline"
        onClick={() => {
          let prevPage = currentPage - 1
          if (prevPage < 1) prevPage = totalPages
          handlePageChange(prevPage)
        }}
      >
        <ChevronLeft />
        prev
      </Button>
      {renderPageButtons}
      <Button
        className="flex items-center gap-x-2 capitalize"
        onClick={() => {
          let nextPage = currentPage + 1
          if (nextPage > totalPages) nextPage = 1
          handlePageChange(nextPage)
        }}
        variant="outline"
      >
        next
        <ChevronRight />
      </Button>
    </div>
  )
}

export default ButtonContainer
