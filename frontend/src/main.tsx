import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from "@mui/material/styles"
import { CssBaseline } from '@mui/material'
import {theme} from "./theme/theme.ts"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { ToastProvider } from './context/ToastContext.jsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <ToastProvider>
      <App />
    </ToastProvider>   
    </ThemeProvider>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
