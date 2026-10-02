import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// estilos de bootstrap para toda la página
import 'bootstrap/dist/css/bootstrap.min.css'
// mis estilos van después para que le ganen a bootstrap
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
