import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Topbar } from '@/components/Layout/Topbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchAddressByCep, normalizeCep } from '@/lib/cepService'
import { applyInputRule } from '@/lib/inputSecurity'

const initialFormData = {
  codigo: '',
  nacionalidade: '',
  cpfCnpj: '',
  nome: '',
  identInscr: '',
  razaoSocial: '',
  cep: '',
  endereco: '',
  numero: '',
  bairro: '',
  cidade: '',
  uf: '',
  dataNasc: '',
  email: '',
  fone: '',
  whatsapp: '',
}

function formatCpfCnpj(rawValue) {
  const digits = String(rawValue ?? '').replace(/\D/g, '').slice(0, 14)

  if (digits.length <= 11) {
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
  }

  if (digits.length <= 2) return digits
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
}

function formatDate(rawValue) {
  const digits = String(rawValue ?? '').replace(/\D/g, '').slice(0, 8)

  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

function formatPhone(rawValue) {
  const digits = String(rawValue ?? '').replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) return digits

  const ddd = digits.slice(0, 2)
  const number = digits.slice(2)

  if (number.length <= 4) {
    return `(${ddd}) ${number}`
  }

  if (digits.length <= 10) {
    return `(${ddd}) ${number.slice(0, 4)}-${number.slice(4)}`
  }

  return `(${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`
}

const FORM_RULES = {
  codigo: {
    maxLength: 20,
    transform: (value) => value.replace(/[^a-zA-Z0-9\s._/-]/g, ''),
  },
  nacionalidade: {
    maxLength: 30,
    transform: (value) => value,
  },
  cpfCnpj: {
    maxLength: 18,
    inputMode: 'numeric',
    transform: formatCpfCnpj,
  },
  nome: {
    maxLength: 80,
    transform: (value) => value.replace(/[^a-zA-Z\s'-]/g, ''),
  },
  identInscr: {
    maxLength: 30,
    transform: (value) => value.replace(/[^a-zA-Z0-9\s./-]/g, ''),
  },
  razaoSocial: {
    maxLength: 120,
    transform: (value) => value.replace(/[^a-zA-Z0-9\s'.,&/-]/g, ''),
  },
  cep: {
    maxLength: 9,
    inputMode: 'numeric',
    transform: (value) => value.replace(/[^0-9-]/g, ''),
  },
  endereco: {
    maxLength: 120,
    transform: (value) => value.replace(/[^a-zA-Z0-9\s'.,/-]/g, ''),
  },
  numero: {
    maxLength: 12,
    transform: (value) => value.replace(/[^a-zA-Z0-9\s/-]/g, ''),
  },
  bairro: {
    maxLength: 60,
    transform: (value) => value.replace(/[^a-zA-Z\s'-]/g, ''),
  },
  cidade: {
    maxLength: 60,
    transform: (value) => value.replace(/[^a-zA-Z\s'-]/g, ''),
  },
  uf: {
    maxLength: 2,
    transform: (value) => value.toUpperCase(),
  },
  dataNasc: {
    maxLength: 10,
    inputMode: 'numeric',
    transform: formatDate,
  },
  email: {
    maxLength: 100,
    inputMode: 'email',
    transform: (value) => value.replace(/\s/g, ''),
  },
  fone: {
    maxLength: 15,
    inputMode: 'tel',
    transform: formatPhone,
  },
  whatsapp: {
    maxLength: 15,
    inputMode: 'tel',
    transform: formatPhone,
  },
}

const fieldStyle =
  'h-10 border-[#3b3247] bg-[#221b2a] text-[#f3eef8] placeholder:text-[#8f859c] focus-visible:border-[#8e72b3] focus-visible:ring-2 focus-visible:ring-[#8e72b3]/25'

const UF_OPTIONS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

const NACIONALIDADE_OPTIONS = [
  'Brasileiro',
  'Argentino',
  'Boliviano',
  'Chileno',
  'Colombiano',
  'Paraguaio',
  'Peruano',
  'Uruguaio',
  'Venezuelano',
  'Outro',
]

function Field({ label, name, value, onChange, placeholder, className = '' }) {
  const rule = FORM_RULES[name] ?? {}

  return (
    <div className={className}>
      <label className="mb-2 block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#8f859c]">
        {label}
      </label>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={rule.maxLength}
        inputMode={rule.inputMode}
        className={fieldStyle}
      />
    </div>
  )
}

function SelectField({ label, name, value, onChange, options, placeholder, className = '' }) {
  return (
    <div className={className}>
      <label className="mb-2 block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#8f859c]">
        {label}
      </label>
      <select name={name} value={value} onChange={onChange} className={`${fieldStyle} w-full rounded-md px-3 py-1 text-sm`}>
        <option value="" className="bg-[#221b2a] text-[#8f859c]">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#221b2a] text-[#f3eef8]">
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <h2 className="mb-3 border-b border-[#3b324766] pb-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#8e72b3]">
      {children}
    </h2>
  )
}

export function CadastroCliente() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)
  const [cepStatus, setCepStatus] = useState({ type: 'idle', message: '' })
  const lastFetchedCepRef = useRef('')
  const activeCepControllerRef = useRef(null)

  function handleChange(event) {
    const { name, value } = event.target
    const rule = FORM_RULES[name]

    setFormData((previous) => ({
      ...previous,
      [name]: applyInputRule(value, rule),
    }))
  }

  function handleClear() {
    if (activeCepControllerRef.current) {
      activeCepControllerRef.current.abort()
      activeCepControllerRef.current = null
    }

    lastFetchedCepRef.current = ''
    setCepStatus({ type: 'idle', message: '' })
    setFormData(initialFormData)
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log('Cadastro cliente:', formData)
  }

  useEffect(() => {
    const normalizedCep = normalizeCep(formData.cep)

    if (normalizedCep.length !== 8) {
      if (activeCepControllerRef.current) {
        activeCepControllerRef.current.abort()
        activeCepControllerRef.current = null
      }

      setCepStatus({ type: 'idle', message: '' })
      return undefined
    }

    if (normalizedCep === lastFetchedCepRef.current) {
      return undefined
    }

    const timeoutId = setTimeout(() => {
      const controller = new AbortController()

      if (activeCepControllerRef.current) {
        activeCepControllerRef.current.abort()
      }

      activeCepControllerRef.current = controller
      setCepStatus({ type: 'loading', message: 'Buscando CEP...' })

      fetchAddressByCep(normalizedCep, controller.signal)
        .then((address) => {
          if (controller.signal.aborted) {
            return
          }

          lastFetchedCepRef.current = normalizedCep
          setFormData((previous) => ({
            ...previous,
            endereco: address.endereco || previous.endereco,
            bairro: address.bairro || previous.bairro,
            cidade: address.cidade || previous.cidade,
            uf: address.uf ? applyInputRule(address.uf, FORM_RULES.uf) : previous.uf,
          }))
          setCepStatus({ type: 'success', message: 'Endereco preenchido automaticamente.' })
        })
        .catch((error) => {
          if (controller.signal.aborted) {
            return
          }

          setCepStatus({
            type: 'error',
            message: error?.message === 'CEP nao encontrado'
              ? 'CEP nao encontrado. Preencha o endereco manualmente.'
              : 'Nao foi possivel consultar o CEP agora.',
          })
        })
        .finally(() => {
          if (activeCepControllerRef.current === controller) {
            activeCepControllerRef.current = null
          }
        })
    }, 450)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [formData.cep])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Topbar />

      <main className="flex-1 overflow-y-auto bg-white p-6">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-7 flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/menu')}
              className="h-9 border-[#cfc7da] bg-transparent font-mono text-[11px] text-[#766e7f] uppercase tracking-[0.16em] transition-colors hover:border-[#8e72b3] hover:bg-transparent hover:text-[#8e72b3]"
            >
              ← Menu
            </Button>

            <h1 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2f2737] sm:text-base">
              <span className="mr-2 text-[#8e72b3]">→</span>
              Cadastro de Cliente
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <section className="mb-7">
              <SectionLabel>Identificacao</SectionLabel>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Field
                  label="Codigo"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  placeholder="gerado auto"
                />
                <SelectField
                  label="Nacionalidade"
                  name="nacionalidade"
                  value={formData.nacionalidade}
                  onChange={handleChange}
                  placeholder="Selecione"
                  options={NACIONALIDADE_OPTIONS}
                />
                <Field
                  label="CPF / CNPJ"
                  name="cpfCnpj"
                  value={formData.cpfCnpj}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                />
                <Field
                  label="Nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder=""
                />
                <Field
                  label="Ident / Inscr Est"
                  name="identInscr"
                  value={formData.identInscr}
                  onChange={handleChange}
                  placeholder=""
                />
                <Field
                  label="Razao Social"
                  name="razaoSocial"
                  value={formData.razaoSocial}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
            </section>

            <section className="mb-7">
              <SectionLabel>Endereco</SectionLabel>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Field
                  label="CEP"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                />
                {cepStatus.type !== 'idle' ? (
                  <p
                    className={`-mt-1 md:col-span-2 font-mono text-[10px] tracking-[0.12em] ${
                      cepStatus.type === 'error' ? 'text-[#b9626e]' : 'text-[#8f859c]'
                    }`}
                  >
                    {cepStatus.message}
                  </p>
                ) : null}
                <Field
                  label="Endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder=""
                  className="md:col-span-2"
                />
                <Field
                  label="Numero"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  placeholder=""
                />
                <Field
                  label="Bairro"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  placeholder=""
                />
                <Field
                  label="Cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder=""
                />
                <SelectField
                  label="UF"
                  name="uf"
                  value={formData.uf}
                  onChange={handleChange}
                  placeholder="Selecione"
                  options={UF_OPTIONS}
                />
              </div>
            </section>

            <section>
              <SectionLabel>Contato</SectionLabel>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Field
                  label="Data Nasc"
                  name="dataNasc"
                  value={formData.dataNasc}
                  onChange={handleChange}
                  placeholder="DD/MM/AAAA"
                />
                <Field
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=""
                />
                <Field
                  label="Fone"
                  name="fone"
                  value={formData.fone}
                  onChange={handleChange}
                  placeholder=""
                />
                <Field
                  label="WhatsApp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
            </section>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                className="h-10 flex-1 border-[#cfc7da] bg-transparent text-[13px] font-semibold text-[#766e7f] transition-colors hover:border-[#8e72b3] hover:bg-transparent hover:text-[#8e72b3]"
              >
                Limpar
              </Button>
              <Button
                type="submit"
                className="h-10 border-0 bg-gradient-to-r from-[#6f4f99] to-[#8e72b3] text-[13px] font-semibold text-[#f7f2fb] transition-all hover:brightness-105 sm:flex-[2]"
              >
                Gravar
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
