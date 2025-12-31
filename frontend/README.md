# Frontend

## Estrutura do Projeto

```text
src/
├── assets/             # Imagens, ícones
├── components/         # Componentes reutilizáveis (Botões, Inputs, Navbar, Gráficos)
│   ├── Layout/         # Layouts específicos (ex: LayoutCliente, LayoutFuncionario)
│   └── UI/             # Componentes visuais básicos
├── contexts/           # Gerenciamento de estado global
│   └── AuthContext.jsx # Guarda o token e o "role" (tipo de usuário)
├── hooks/              # Hooks personalizados (ex: useMqtt)
├── pages/
│   ├── Login/          # Tela de Login (Pública)
│   ├── Client/         # Telas exclusivas do Cliente
│   │   ├── Dashboard/  # (RF01, RF02)
│   │   └── Support/    # (RF06, RF07)
│   └── Employee/       # Telas exclusivas do Funcionário
│       ├── Monitor/    # (RF08, RF09)
│       └── Management/ # (RF11, RF12)
├── services/           # Comunicação com Backend
│   └── api.js          # Instância do Axios
├── routes/             # Configuração de rotas
│   ├── AppRoutes.jsx   # Definição das rotas
│   └── PrivateRoute.jsx # Componente de proteção de rota
├── App.jsx
└── main.jsx
```


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
