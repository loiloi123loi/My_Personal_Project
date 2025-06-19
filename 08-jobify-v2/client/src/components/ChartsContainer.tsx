import { getChartsData } from '@/api/job'
import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { GetChartsDataResponse } from './@types/Response'

const ChartsContainer = () => {
  const { data, isFetching } = useQuery<GetChartsDataResponse>({
    queryKey: ['charts'],
    queryFn: () => getChartsData()
  })

  if (isFetching) return <h2 className="text-xl font-medium mt-16">Please wait...</h2>

  if (!data || !data?.result?.data?.length || data?.result?.data?.length < 1) return null

  return (
    <section className="mt-16">
      <h1 className="text-4xl font-semibold text-center">Monthly Applications</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data?.result?.data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}

export default ChartsContainer
