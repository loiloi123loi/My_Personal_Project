import { DateRangePicker } from '@/components/DateRangePicker'
import { CustomFormField, CustomFormSelect } from '@/components/FormComponents'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { JobStatusList, JobTypeList } from '@/utils/enums'
import { searchFormSchema } from '@/utils/schemas'
import { SearchFormType } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

function SearchForm() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const form = useForm<SearchFormType>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: searchParams.get('search') || '',
      status: searchParams.get('status') || 'all',
      type: searchParams.get('job_type') || 'all',
      created_at: {
        startDate: searchParams.get('created_at.startDate') || '',
        endDate: searchParams.get('created_at.endDate') || ''
      }
    }
  })

  const onSubmit = (values: SearchFormType) => {
    const params = new URLSearchParams(searchParams)

    if (values.search) params.set('search', values.search)
    else params.delete('search')
    if (values.status) params.set('status', values.status)
    else params.delete('status')
    if (values.type) params.set('type', values.type)
    else params.delete('type')
    if (values.created_at?.startDate) params.set('created_at.startDate', values.created_at.startDate)
    else params.delete('created_at.startDate')
    if (values.created_at?.endDate) params.set('created_at.endDate', values.created_at.endDate)
    else params.delete('created_at.endDate')

    params.set('page', '1')
    navigate(`${location.pathname}?${params.toString()}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted mb-8 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg"
      >
        <CustomFormField name="search" control={form.control} placeholder="Search Jobs" />
        <CustomFormSelect
          name="status"
          control={form.control}
          labelText="Job Status"
          items={[{ label: 'All', value: 'all' }, ...JobStatusList]}
        />
        <CustomFormSelect
          name="type"
          control={form.control}
          labelText="Job Type"
          items={[{ label: 'All', value: 'all' }, ...JobTypeList]}
        />
        <DateRangePicker name="created_at" label="Created At" control={form.control} />
        <Button type="submit" className="capitalize self-end">
          Search
        </Button>
      </form>
    </Form>
  )
}

export default SearchForm
