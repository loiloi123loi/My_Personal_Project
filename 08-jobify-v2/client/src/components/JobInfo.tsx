import { ReactNode } from 'react'

interface JobInfoProps {
  icon: ReactNode
  text: string
}

function JobInfo({ icon, text }: JobInfoProps) {
  return (
    <div className="flex gap-x-2 items-center">
      {icon}
      {text}
    </div>
  )
}

export default JobInfo
