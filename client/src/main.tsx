import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Router } from '@/routes'

import '@/styles/globals.scss'

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
