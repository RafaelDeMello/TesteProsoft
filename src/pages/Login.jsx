import { Settings } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { setAuthenticated } from '@/lib/auth'
import { applyInputRule } from '@/lib/inputSecurity'

const LOGIN_RULES = {
  login: {
    maxLength: 40,
    transform: (value) => value.replace(/[^a-zA-Z0-9._@-]/g, ''),
  },
  senha: {
    maxLength: 64,
    transform: (value) => value.replace(/\s/g, ''),
  },
}

export function Login() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ login: '', senha: '' })

  function handleChange(event) {
    const { name, value } = event.target
    const rule = LOGIN_RULES[name]

    setCredentials((previous) => ({
      ...previous,
      [name]: applyInputRule(value, rule),
    }))
  }

  function handleLogin() {
    setAuthenticated(true)
    navigate('/menu', { replace: true })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#7b5ba5] bg-[#221b2a] shadow-[0_10px_30px_-22px_rgba(60,41,86,0.75)]">
            <Settings size={24} color="#8e72b3" />
          </div>
          <h1 className="text-[1.7rem] font-semibold uppercase tracking-[0.22em] text-[#2f2737]">
            Pro
            <span className="text-[#b9a5d4]">Soft</span>
          </h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7e7588]">
            sistema de gestao
          </p>
        </div>

        <section className="rounded-lg border border-[#3b3247] bg-[#221b2a] p-8 shadow-[0_16px_40px_-28px_rgba(46,29,61,0.65)]">
          <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
            <div className="space-y-2">
              <label className="block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#8f859c]">
                Login
              </label>
              <Input
                name="login"
                type="text"
                autoComplete="username"
                value={credentials.login}
                onChange={handleChange}
                maxLength={LOGIN_RULES.login.maxLength}
                className="h-10 border-[#3b3247] bg-[#1a1520] text-[#f2edf7] placeholder:text-[#7e7588] focus-visible:border-[#8e72b3] focus-visible:ring-2 focus-visible:ring-[#8e72b3]/25"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#8f859c]">
                Senha
              </label>
              <Input
                name="senha"
                type="password"
                autoComplete="current-password"
                value={credentials.senha}
                onChange={handleChange}
                maxLength={LOGIN_RULES.senha.maxLength}
                className="h-10 border-[#3b3247] bg-[#1a1520] text-[#f2edf7] placeholder:text-[#7e7588] focus-visible:border-[#8e72b3] focus-visible:ring-2 focus-visible:ring-[#8e72b3]/25"
              />
            </div>

            <Button
              type="button"
              onClick={handleLogin}
              className="mt-2 h-10 w-full border-0 bg-gradient-to-r from-[#6f4f99] to-[#8e72b3] text-[13px] font-semibold uppercase tracking-[0.17em] text-[#f7f2fb] transition-all hover:brightness-105"
            >
              Entrar
            </Button>
          </form>
        </section>

        <p className="mt-7 text-center font-mono text-[10px] tracking-[0.04em] text-[#9b93a4]">
          v1.0.0 · ProSoft © 2026
        </p>
      </div>
    </main>
  )
}
