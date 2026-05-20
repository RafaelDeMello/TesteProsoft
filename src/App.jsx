
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { CadastroCliente } from '@/pages/CadastroCliente'
import { Login } from '@/pages/Login'
import { Menu } from '@/pages/Menu'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
