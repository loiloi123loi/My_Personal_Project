import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addJob } from '@/api/job'
import { CustomFormField, CustomFormSelect } from '@/components/FormComponents'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { JobStatusEnum, JobTypeEnum } from '@/utils/enums'
import { createAndEditJobSchema, CreateAndEditJobType } from '@/utils/types'

function AddJob() {
  const query = useQueryClient()
  const navigate = useNavigate()
  const { mutateAsync } = useMutation(addJob, {
    onSuccess: () => {
      toast.success('Create job success')
      query.invalidateQueries(['jobs'])
      navigate('/jobs')
    }
  })
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatusEnum.PENDING,
      job_type: JobTypeEnum.FULL_TIME
    }
  })

  const onSubmit = async (values: CreateAndEditJobType) => {
    await mutateAsync(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>
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
          <Button type="submit" className="self-end capitalize">
            create job
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AddJob
