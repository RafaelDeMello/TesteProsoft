const CEP_DIGITS_REGEX = /\D/g

export function normalizeCep(value) {
  return String(value ?? '').replace(CEP_DIGITS_REGEX, '')
}

export async function fetchAddressByCep(cep, signal) {
  const normalizedCep = normalizeCep(cep)

  if (normalizedCep.length !== 8) {
    throw new Error('CEP invalido')
  }

  const response = await fetch(`https://viacep.com.br/ws/${normalizedCep}/json/`, { signal })

  if (!response.ok) {
    throw new Error('Falha ao consultar CEP')
  }

  const data = await response.json()

  if (data?.erro) {
    throw new Error('CEP nao encontrado')
  }

  return {
    endereco: data?.logradouro ?? '',
    bairro: data?.bairro ?? '',
    cidade: data?.localidade ?? '',
    uf: data?.uf ?? '',
  }
}
