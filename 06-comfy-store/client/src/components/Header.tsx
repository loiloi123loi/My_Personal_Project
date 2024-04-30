import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '~/store'

const Header = () => {
  const { user } = useSelector((state: RootState) => state.userState)
  // const user = {}
  return (
    <header className='bg-neutral py-2 text-neutral-content'>
      <div className='align-element flex justify-center sm:justify-end'>
        {user ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text-sm'>Hello, {user.username}</p>
            <button className='btn btn-xs btn-outline btn-primary'>logout</button>
          </div>
        ) : (
          <div className='flex gap-x-6 justify-center items-center'>
            <Link to='/login' className='link link-hover text-xs sm:text-sm'>
              Sign in / Guest
            </Link>
            <Link to='/register' className='link link-hover text-xs sm:text-sm'>
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
