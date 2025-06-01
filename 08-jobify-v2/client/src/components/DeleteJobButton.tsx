import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { deleteJob } from '@/api/job'
import { Button } from '@/components/ui/button'

interface IDeleteJobButtonProps {
  jobId: string
}

function DeleteJobButton({ jobId }: IDeleteJobButtonProps) {
  const queryClient = useQueryClient()
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
