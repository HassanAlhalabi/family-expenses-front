import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query';
import AuthProvider from './context/auth'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>      
  </React.StrictMode>
)
