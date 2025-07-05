import { IAllJobParams } from '@/components/@types/Request'
import customFetch from '@/utils/axios'
import { CreateAndEditJobType } from '@/utils/types'
import qs from 'qs'

export const addJob = async (job: CreateAndEditJobType) => {
  const { data } = await customFetch.post('/jobs', job)
  return data
}

export const getAllJobs = async (params: IAllJobParams) => {
  const queryString = qs.stringify(params, { encode: true })
  const { data } = await customFetch.get(`/jobs?${queryString}`)
  return data
}

export const deleteJob = async (jobId: string) => {
  const { data } = await customFetch.delete(`/jobs/${jobId}`)
  return data
}

export const getSingleJob = async (jobId: string) => {
  const { data } = await customFetch.get(`/jobs/${jobId}`)
  return data
}

export const updateJob = async (jobId: string, values: CreateAndEditJobType) => {
  const { data } = await customFetch.patch(`/jobs/${jobId}`, values)
  return data
}

export const getStats = async () => {
  const { data } = await customFetch.get('/jobs/stats')
  return data
}

export const getChartsData = async () => {
  const { data } = await customFetch.get('/jobs/charts')
  return data
}
