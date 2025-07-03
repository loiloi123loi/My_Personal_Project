import { CustomFormSelectItem } from '@/components/FormComponents'

export enum ApiMethodType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export enum JobStatusEnum {
  PENDING = 'pending',
  INTERVIEW = 'interview',
  DECLINED = 'declined'
}

export enum JobTypeEnum {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  INTERNSHIP = 'internship'
}

export const JobStatusList: CustomFormSelectItem[] = [
  { label: 'Pending', value: JobStatusEnum.PENDING },
  { label: 'Interview', value: JobStatusEnum.INTERVIEW },
  { label: 'Declined', value: JobStatusEnum.DECLINED }
]

export const JobTypeList: CustomFormSelectItem[] = [
  { label: 'Full Time', value: JobTypeEnum.FULL_TIME },
  { label: 'Part Time', value: JobTypeEnum.PART_TIME },
  { label: 'Internship', value: JobTypeEnum.INTERNSHIP }
]
