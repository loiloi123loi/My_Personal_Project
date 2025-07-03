import { getAllJobs } from '@/api/job'
import { GetAllJobsResponse } from '@/components/@types/Response'
import ButtonContainer from '@/components/ButtonContainer'
import JobCard from '@/components/JobCard'
import { Skeleton } from '@/components/ui/skeleton'
import { JobStatusEnum, JobTypeEnum } from '@/utils/enums'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { CustomFormSelect } from './FormComponents'
import { Form } from './ui/form'

const pagingList = [
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '50', value: '50' },
  { label: '100', value: '100' }
]

function JobsList() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const search = useMemo(() => searchParams.get('search') || '', [searchParams])
  const status = useMemo(() => searchParams.get('status') || 'all', [searchParams])
  const type = useMemo(() => searchParams.get('type') || 'all', [searchParams])
  const page = useMemo(() => searchParams.get('page') || '1', [searchParams])
  const limit = useMemo(() => searchParams.get('limit') || '10', [searchParams])
  const created_at = useMemo(() => {
    const startDate = searchParams.get('created_at.startDate') || ''
    const endDate = searchParams.get('created_at.endDate') || ''
    return { startDate, endDate }
  }, [searchParams])

  const form = useForm<{ limit: string }>({
    resolver: zodResolver(z.object({ limit: z.string().optional() })),
    defaultValues: { limit }
  })

  const { data, isFetching, refetch } = useQuery<GetAllJobsResponse>({
    queryKey: ['jobs', search, status, type, page, limit, created_at],
    queryFn: () =>
      getAllJobs({
        search,
        status: status !== 'all' ? z.nativeEnum(JobStatusEnum).parse(status) : undefined,
        type: type !== 'all' ? z.nativeEnum(JobTypeEnum).parse(type) : undefined,
        page,
        limit,
        created_at
      })
  })

  useEffect(() => {
    form.setValue('limit', limit)
  }, [limit, form])

  const jobs = data?.result?.jobs || []
  const count = data?.result?.totalCount || 0
  const totalPages = data?.result?.totalPages || 1

  if (isFetching) {
    return (
      <div className="p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-lg border">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
    )
  }

  if (jobs.length < 1) return <h2 className="text-xl">No Jobs Found...</h2>

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Form {...form}>
            <CustomFormSelect
              name="limit"
              control={form.control}
              items={pagingList}
              hideLabel
              onChange={(value) => {
                const newParams = new URLSearchParams(searchParams)
                newParams.set('limit', value)
                newParams.set('page', '1')
                navigate({ search: newParams.toString() })
                refetch()
              }}
            />
          </Form>
          <h2 className="text-xl font-semibold capitalize">
            {count} job{count > 1 ? 's' : ''} found
          </h2>
        </div>
        {totalPages > 1 && <ButtonContainer currentPage={Number(page)} totalPages={totalPages} />}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </>
  )
}

export default JobsList
