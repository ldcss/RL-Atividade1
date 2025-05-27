# RocketShop

Site de e-commerce criado para a primeira atividade do RocketLab.

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado v18 ou superior)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/ldcss/RL-Atividade1.git
   cd RL-Atividade1
   ```

2. **Instale as dependências:**

   ```bash
   pnpm install
   ```

### Rodando a aplicação

Inicie o servidor de desenvolvimento:

```bash
pnpm run dev
```

A aplicação estará disponível em [http://localhost:5173](http://localhost:5173).

Ou simplesmente acesse [https://rocket-shop-kappa.vercel.app/](https://rocket-shop-kappa.vercel.app/)

## Estrutura do Projeto

- src/pages: Contém todas as páginas do website.
- src/components: Todos os componentes que são reutilizados em páginas ou outros componentes.
- src/hooks: Hooks customizadas criadas para uso no projeto.
- src/types: Tipagem utilizada no projeto (props, tipos que simulam dto's e etc.).
- src/utils: Funções que são utilizadas pelos componentes, além de possuir os dados mockados utilizados no sistema.

## Funcionalidades

- Listagem de produtos por categorias.
- Possibilidade de favoritar produtos e filtragem por ordem de preço, alfabética e etc.
- Página de detalhes do produto com imagem, número de avaliações (mockado), compartilhamento, possibilidade de fazer uma avaliação (não é salva) e etc.
- Popup de carrinho com informações acerca da compra total.
- Formulário de validação de compra que utiliza a biblioteca React Hook Form.
- Persistência de itens no carrinho e itens favoritados que utiliza o local storage.
- Layout responsivo.

## Principais bibliotecas utilizadas

- Tailwind, ESLint, Prettier, React Dom, React Hook Form, React Icons

## Principais hooks utilizadas

- useState: Gerenciamento de estados para re-renderização de componentes.
- useEffect: Efeito colateral após renderização de componente ou atualização de estado.
- useMemo: Otimização de desempenho, memorizando resultados de funções.
- useRef: Criar referência a um elemento DOM (searchbar).
- useContext: Criar contexto do website (itens favoritados e no carrinho), além de atualizar os itens no local storage.

### Custom Hooks

- useShop: Manipula itens e funções que antes eram passadas entre diversos componentes, mitigando o Prop drilling
- useDebounce: Utiliza hooks nativas para implementar busca em tempo real na searchbar.

## Design

O Design foi inspirado em referências no Pinterest e Freepik, buscando a simplicidade em funcionalidades, UI e cores.

## Uso de IA

No projeto foram utilizados o Github Copilot e Google Gemini, para economizar esforço na estilização de componentes mais complexos utilizando Tailwind, além da resolução de problemas e erros no código.

---

O projeto foi criado utilizado [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) e [Vite](https://vitejs.dev/).
