import { useRoutes } from 'react-router-dom'
import AddJob from '@/pages/dashboard/AddJob'
import AllJobs from '@/pages/dashboard/AllJobs'
import SharedLayout from '@/pages/dashboard/SharedLayout'
import SingleJob from '@/pages/dashboard/SingleJob'
import Stats from '@/pages/dashboard/Stats'
import Landing from '@/pages/Home'
import Login from '@/pages/Login'

export default function useRouteElements() {
  const routes = useRoutes([
    {
      path: '',
      element: <SharedLayout />,
      children: [
        {
          index: true,
          element: <AddJob />
        },
        {
          path: 'jobs',
          element: <AllJobs />
        },
        {
          path: 'jobs/:jobId',
          element: <SingleJob />
        },
        {
          path: 'stats',
          element: <Stats />
        }
      ]
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'register',
      element: <Landing />
    },
    {
      path: 'landing',
      element: <Landing />
    }
  ])
  return routes
}
