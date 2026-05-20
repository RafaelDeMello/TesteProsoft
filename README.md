# ProSoft Frontend

Frontend do sistema ProSoft desenvolvido com React + Vite, usando Tailwind CSS v4 e shadcn/ui.

O projeto implementa um fluxo inicial de ERP com:
- Login
- Menu principal
- Cadastro de cliente com preenchimento automatico por CEP

## Stack

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 4 (`@tailwindcss/vite`)
- shadcn/ui (preset `radix-nova`)
- Lucide React (icones)

## Tema e Design System

Tema visual corporativo claro, com superfices em roxo escuro para componentes principais.

- Fonte base: `IBM Plex Sans`
- Fonte mono: `IBM Plex Mono`
- Tokens globais e base theme em `src/index.css`
- Cores ProSoft adicionais em `tailwind.config.js`

## Rotas

Configuradas em `src/App.jsx`:

- `/` -> Login
- `/menu` -> Menu principal
- `/cadastro-cliente` -> Cadastro de cliente

## Funcionalidades implementadas

### Login

- UI centralizada com identidade ProSoft
- Campos controlados (`login`, `senha`)
- Regras de entrada com limite de tamanho e sanitizacao
- Navegacao para `/menu` no botao Entrar

### Menu

- Topbar reutilizavel (`Topbar`) com avatar e logout opcional
- Cards de atalho com hover e icones
- Navegacao para cadastro de cliente

### Cadastro de Cliente

- Formulario por secoes: Identificacao, Endereco e Contato
- Estado unico com `useState`
- Botao Limpar e botao Gravar (`console.log` dos dados)
- Campo `Nacionalidade` via `select`
- Campo `UF` via `select` com estados brasileiros
- Mascaras:
  - CPF/CNPJ (dinamica)
  - Data de nascimento (`DD/MM/AAAA`)
  - Telefone e WhatsApp (`(XX) XXXX-XXXX` / `(XX) XXXXX-XXXX`)

### Integracao CEP (ViaCEP)

- Busca automatica ao completar 8 digitos
- Debounce para evitar chamadas excessivas
- Cancelamento de requests anteriores (`AbortController`)
- Preenchimento automatico de `endereco`, `bairro`, `cidade`, `uf`
- Feedback de status (buscando, sucesso, erro)

## Seguranca de entrada (frontend)

Utilitarios em `src/lib/inputSecurity.js`:

- Remocao de caracteres de controle
- Remocao de caracteres perigosos (`<`, `>`, `` ` ``)
- Limite maximo por campo
- Transformacoes por regra de cada input

Observacao: validacao de frontend melhora UX e reduz lixo de dados, mas validacao definitiva deve existir no backend.

## Estrutura de pastas (principal)

```text
src/
  components/
    Layout/
      Topbar.jsx
    ui/
      button.jsx
      input.jsx
  lib/
    cepService.js
    inputSecurity.js
    utils.js
  pages/
    Login.jsx
    Menu.jsx
    CadastroCliente.jsx
  App.jsx
  main.jsx
  index.css
```

## Como rodar localmente

### Requisitos

- Node.js 20+
- Yarn 1.x

### Instalacao

```bash
yarn install
```

### Desenvolvimento

```bash
yarn dev
```

### Build de producao

```bash
yarn build
```

### Preview local do build

```bash
yarn preview
```

## Scripts disponiveis

- `yarn dev` - inicia servidor de desenvolvimento (Vite)
- `yarn build` - gera build de producao
- `yarn preview` - sobe preview local do build

## Proximos passos sugeridos

- Persistir cadastro em API/backend
- Adicionar validacao de negocio (campos obrigatorios e formatos)
- Implementar autenticacao real no login
- Criar testes de formulario e fluxo de navegacao
