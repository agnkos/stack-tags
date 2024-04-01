import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const tenMinInMs = 1000 * 60 * 10
const fifteenMinInMs = 1000 * 60 * 15

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        refetchOnReconnect: false,
        staleTime: tenMinInMs,
        gcTime: fifteenMinInMs
      },
    },
  }
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
