import { ChevronRight, FilePlus, Receipt, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Topbar } from '@/components/Layout/Topbar'

const menuItems = [
  {
    title: 'Cadastrar Cliente',
    description: 'novo registro de cliente',
    icon: UserPlus,
    onClickPath: '/cadastro-cliente',
  },
  {
    title: 'Abertura de OS',
    description: 'nova ordem de servico',
    icon: FilePlus,
    onClickPath: null,
  },
  {
    title: 'Consultar Debitos',
    description: 'pendencias financeiras',
    icon: Receipt,
    onClickPath: null,
  },
]

export function Menu() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Topbar showLogout />

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-[400px] space-y-[14px]">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  if (item.onClickPath) {
                    navigate(item.onClickPath)
                  }
                }}
                className="group relative flex w-full items-center gap-4 overflow-hidden rounded-md border border-[#3b3247] bg-[#221b2a] px-7 py-6 text-left shadow-[0_10px_30px_-26px_rgba(46,29,61,0.7)] transition-colors duration-200 hover:border-[#8e72b37a]"
              >
                <span className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#6f4f99] to-[#b29ad1] opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[#7b5ba555] bg-[#7b5ba51a]">
                  <Icon size={22} color="#b9a5d4" />
                </div>

                <div className="flex-1">
                  <h2 className="text-[15px] font-semibold text-[#f3eef8]">{item.title}</h2>
                  <p className="mt-1 font-mono text-[11px] lowercase tracking-[0.08em] text-[#9f95ad]">
                    {item.description}
                  </p>
                </div>

                <ChevronRight
                  size={20}
                  className="shrink-0 text-[#5c5169] transition-all duration-200 group-hover:translate-x-[3px] group-hover:text-[#b9a5d4]"
                />
              </button>
            )
          })}
        </div>
      </main>
    </div>
  )
}
