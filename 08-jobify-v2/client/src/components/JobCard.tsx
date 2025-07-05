import { dateFormat } from '@/components/DateRangePicker'
import DeleteJobButton from '@/components/DeleteJobButton'
import JobInfo from '@/components/JobInfo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { JobType } from '@/utils/types'
import { format } from 'date-fns'
import { Briefcase, CalendarDays, MapPin, RadioTower } from 'lucide-react'
import { Link } from 'react-router-dom'

function JobCard({ job }: { job: JobType }) {
  return (
    <Card className="capitalize bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 grid grid-cols-2 gap-4">
        <JobInfo icon={<Briefcase />} text={job.job_type} />
        <JobInfo icon={<MapPin />} text={job.job_location} />
        <JobInfo icon={<CalendarDays />} text={format(new Date(job.created_at), dateFormat)} />
        <Badge className="w-32  justify-center">
          <JobInfo icon={<RadioTower className="w-4 h-4" />} text={job.status} />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link to={`/jobs/${job._id}`}>edit</Link>
        </Button>
        <DeleteJobButton jobId={job._id} />
      </CardFooter>
    </Card>
  )
}

export default JobCard
