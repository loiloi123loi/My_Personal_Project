import { getAllJobs } from '@/api/job'
import { GetAllJobsResponse } from '@/components/@types/Response'
import JobCard from '@/components/JobCard'
import { JobStatusEnum } from '@/utils/enums'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import ButtonContainer from './ButtonContainer'
import { Skeleton } from './ui/skeleton'

function JobsList() {
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || 'all'

  const pageNumber = Number(searchParams.get('page')) || 1

  const { data, isFetching } = useQuery<GetAllJobsResponse>({
    queryKey: ['jobs', search ?? '', status, pageNumber],
    queryFn: () =>
      getAllJobs({
        search,
        status: status !== 'all' ? z.nativeEnum(JobStatusEnum).parse(status) : status,
        page: pageNumber
      })
  })
  const jobs =
    data?.result?.jobs ||
    [
      // {
      //   _id: 'test1',
      //   company: 'test',
      //   job_type: JobTypeEnum.FULL_TIME,
      //   location: 'test',
      //   position: 'test',
      //   status: JobStatusEnum.INTERVIEW,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   _id: 'test2',
      //   company: 'test',
      //   job_type: JobTypeEnum.FULL_TIME,
      //   location: 'test',
      //   position: 'test',
      //   status: JobStatusEnum.INTERVIEW,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   _id: 'test3',
      //   company: 'test',
      //   job_type: JobTypeEnum.FULL_TIME,
      //   location: 'test',
      //   position: 'test',
      //   status: JobStatusEnum.INTERVIEW,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // }
    ]
  const count = data?.result?.count || 100
  const page = data?.result?.page || 2
  const totalPages = data?.result?.totalPages || 10

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
        <h2 className="text-xl font-semibold capitalize ">{count} jobs found</h2>
        {totalPages < 2 ? null : <ButtonContainer currentPage={page} totalPages={totalPages} />}
      </div>
      <div className="grid md:grid-cols-2  gap-8">
        {jobs.map((job) => {
          return <JobCard key={job._id} job={job} />
        })}
      </div>
    </>
  )
}

export default JobsList
