import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChatApp } from './ChatApp'
import { BrowserRouter } from "react-router-dom";
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatApp />
    </BrowserRouter>
  </React.StrictMode>
)
