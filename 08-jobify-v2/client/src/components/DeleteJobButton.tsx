import { deleteJob } from '@/api/job'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

interface IDeleteJobButtonProps {
  jobId: string
}

function DeleteJobButton({ jobId }: IDeleteJobButtonProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (jobId: string) => deleteJob(jobId),
    onSuccess: (data) => {
      if (!data) {
        toast.error('Delete job failed')
        return
      }
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      queryClient.invalidateQueries({ queryKey: ['charts'] })
      const newParams = new URLSearchParams(searchParams)
      newParams.delete('page')
      navigate(`/jobs?${newParams.toString()}`)
      toast.success('Delete job success')
    }
  })

  return (
    <Button size="sm" disabled={isLoading} onClick={() => mutateAsync(jobId)} className="capitalize">
      {isLoading ? 'deleting...' : 'delete'}
    </Button>
  )
}

export default DeleteJobButton
