import { getStats } from '@/api/job'
import { GetStatsResponse } from '@/components/@types/Response'
import StatsCard, { StatsLoadingCard } from '@/components/StatsCard'
import { useQuery } from '@tanstack/react-query'

const StatsContainer = () => {
  const { data, isFetching } = useQuery<GetStatsResponse>({
    queryKey: ['stats'],
    queryFn: getStats
  })

  if (isFetching) {
    return (
      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
        <StatsLoadingCard />
        <StatsLoadingCard />
        <StatsLoadingCard />
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsCard title="pending jobs" value={data?.result?.pending || 0} />
      <StatsCard title="interviews set" value={data?.result?.interview || 0} />
      <StatsCard title="jobs declined" value={data?.result?.declined || 0} />
    </div>
  )
}

export default StatsContainer
