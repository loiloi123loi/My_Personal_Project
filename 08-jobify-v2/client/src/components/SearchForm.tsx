import { FormEvent } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { JobStatusEnum } from '@/utils/enums'

function SearchForm() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || 'all'
  const navigate = useNavigate()
  const pathname = useLocation()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search') as string
    const status = formData.get('status') as string
    params.set('search', search)
    params.set('status', status)
    navigate(`${pathname}?${params.toString()}`)
  }

  return (
    <form className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg" onSubmit={handleSubmit}>
      <Input type="text" placeholder="Search Jobs" name="search" defaultValue={search} />
      <Select name="status" defaultValue={status}>
        <SelectTrigger className="capitalize">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="capitalize">
          {['all', ...Object.values(JobStatusEnum)].map((jobStatus) => {
            return (
              <SelectItem key={jobStatus} value={jobStatus}>
                {jobStatus}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  )
}

export default SearchForm
