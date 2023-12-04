import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Router'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './Providers/AuthProvider'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <div className='max-w-screen-xl	mx-auto'>
            <RouterProvider router={router}>

            </RouterProvider>
          </div>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
