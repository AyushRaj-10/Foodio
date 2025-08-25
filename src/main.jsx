import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './Context/AppContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './Context/CartContenxt.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <CartProvider>
    <App />
        </CartProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
