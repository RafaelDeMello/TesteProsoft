
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { isAuthenticated } from '@/lib/auth'
import { CadastroCliente } from '@/pages/CadastroCliente'
import { Login } from '@/pages/Login'
import { Menu } from '@/pages/Menu'

function RequireAuth({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  return children
}

function PublicOnly({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/menu" replace />
  }

  return children
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <PublicOnly>
              <Login />
            </PublicOnly>
          )}
        />
        <Route
          path="/menu"
          element={(
            <RequireAuth>
              <Menu />
            </RequireAuth>
          )}
        />
        <Route
          path="/cadastro-cliente"
          element={(
            <RequireAuth>
              <CadastroCliente />
            </RequireAuth>
          )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
