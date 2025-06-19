import { login } from '@/api/auth'
import { ILoginReqBody } from '@/components/@types/Request'
import InputFormItem from '@/components/InputFormItem'
import { AuthContext } from '@/contexts/AuthContext'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
  const { loadAuth, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ILoginReqBody>()

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      try {
        localStorage.setItem('accessToken', data.result.access_token)
        localStorage.setItem('refreshToken', data.result.refresh_token)
        await loadAuth()
        toast.success(data.message)
      } catch (error) {
        console.error('Login error:', error)
        toast.error('Failed to complete login process')
      }
    }
  })

  const onSubmit = (data: ILoginReqBody) => {
    loginMutation.mutate(data)
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Đăng nhập</h1>
          <p className="text-sm text-gray-500">Chào mừng bạn quay trở lại!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <InputFormItem
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            register={register}
            error={errors.email?.message as string}
          />
          <InputFormItem
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
            register={register}
            error={errors.password?.message as string}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
          Bạn chưa có tài khoản?{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Đăng ký
          </a>
        </div>
      </div>
    </section>
  )
}

export default Login
