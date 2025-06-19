import { ILoginReqBody } from '@/components/@types/Request'
import customFetch from '@/utils/axios'

export const login = async ({ email, password }: ILoginReqBody) => {
  const { data } = await customFetch.post('/users/login', {
    email,
    password
  })
  return data
}

export const getUserInfo = async () => {
  const { data } = await customFetch.get('/users/me')
  return data
}
