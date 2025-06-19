import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { createContext, ReactNode } from 'react'

interface LoadingContextType {
  isLoading: boolean
}

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false
})

const LoadingContextProvider = ({ children }: { children: ReactNode }) => {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const isLoading = isFetching > 0 || isMutating > 0

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
      {/* {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/30 backdrop-blur-[20]">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )} */}
    </LoadingContext.Provider>
  )
}

export default LoadingContextProvider
