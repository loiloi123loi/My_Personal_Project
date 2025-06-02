import { useParams } from 'react-router-dom'
import EditJobForm from '@/components/EditJobForm'

const SingleJob = () => {
  const { jobId } = useParams()

  if (!jobId) {
    return null
  }

  return (
    <>
      <EditJobForm jobId={jobId} />
    </>
  )
}

export default SingleJob
