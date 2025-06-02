import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSingleJob, updateJob } from '@/api/job'
import { CustomFormField, CustomFormSelect } from '@/components/FormComponents'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { JobStatusEnum, JobTypeEnum } from '@/utils/enums'
import { createAndEditJobSchema, CreateAndEditJobType } from '@/utils/types'

interface IEditJobFormProps {
  jobId: string
}

const EditJobForm = ({ jobId }: IEditJobFormProps) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data } = useQuery<CreateAndEditJobType>({
    queryKey: ['job', jobId],
    queryFn: () => getSingleJob(jobId)
  })
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => updateJob(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast.error('Update job failed')
        return
      }
      toast.success('Update job success')
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: ['job', jobId] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      navigate('/jobs')
    }
  })
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || '',
      company: data?.company || '',
      location: data?.location || '',
      status: (data?.status as JobStatusEnum) || JobStatusEnum.PENDING,
      job_type: (data?.job_type as JobTypeEnum) || JobTypeEnum.FULL_TIME
    }
  })
  const onSubmit = async (values: CreateAndEditJobType) => {
    await mutateAsync(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="capitalize font-semibold text-4xl mb-6">edit job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          <CustomFormField name="position" control={form.control} />
          <CustomFormField name="company" control={form.control} />
          <CustomFormField name="location" control={form.control} />
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatusEnum)}
          />
          <CustomFormSelect
            name="job_type"
            control={form.control}
            labelText="job type"
            items={Object.values(JobTypeEnum)}
          />
          <Button type="submit" className="self-end capitalize" disabled={isLoading}>
            {isLoading ? 'updating...' : 'edit job'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditJobForm
