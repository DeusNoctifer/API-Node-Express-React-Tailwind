import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
<StrictMode>
<BrowserRouter> {/* Envuelve tu App con BrowserRouter */}
<App />
</BrowserRouter>
</StrictMode>,
)