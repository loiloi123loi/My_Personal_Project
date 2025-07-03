import ErrorBoundary from '@/components/ErrorBoundary'
import { AuthProvider } from '@/contexts/AuthContext'
import LoadingContextProvider from '@/contexts/LoadingContext'
import ThemeProvider from '@/contexts/ThemeContext'
import useRouteElements from '@/routes/useRouteElement'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  console.log('render')
  const routes = useRouteElements()
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 * 5,
            retry: 0
          }
        }
      })
  )

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <LoadingContextProvider>
              <AuthProvider>
                {routes}
                <ToastContainer />
              </AuthProvider>
            </LoadingContextProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App
