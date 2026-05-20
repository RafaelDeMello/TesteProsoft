import { Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { setAuthenticated } from '@/lib/auth'

export function Topbar({ showLogout = false }) {
  const navigate = useNavigate()

  function handleLogout() {
    setAuthenticated(false)
    navigate('/', { replace: true })
  }

  return (
    <header className="border-b border-[#3b3247] bg-[#221b2a] shadow-[0_1px_0_0_rgba(255,255,255,0.03)]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <Settings size={18} color="#8e72b3" />
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f6f2fb]">
            Pro
            <span className="text-[#8e72b3]">Soft</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#7b5ba555] bg-[#7b5ba51a] text-xs font-semibold uppercase tracking-wider text-[#b9a5d4]">
            AD
          </div>
          <span className="font-mono text-xs tracking-[0.08em] text-[#f3eef8]">admin</span>
          {showLogout ? (
            <button
              type="button"
              onClick={handleLogout}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#b9a5d4] transition-colors hover:text-[#eee7f8]"
            >
              sair
            </button>
          ) : null}
        </div>
      </div>
    </header>
  )
}
