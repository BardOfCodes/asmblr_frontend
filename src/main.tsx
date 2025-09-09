import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EnhancedApp } from './EnhancedApp.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EnhancedApp />
  </StrictMode>,
)
