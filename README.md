# Suas Tasks

Aplicação web para organização pessoal, com autenticação de usuário e gestão de tarefas por conta individual. O objetivo é permitir que cada pessoa acesse sua própria lista, adicione itens, marque conclusões e mantenha o controle do que precisa fazer.

## Funcionalidade

A aplicação oferece:

- Tela de login com autenticação por e-mail e senha do Firebase Authentication;
- Proteção de rotas para que usuários não autenticados não acessem a área de tarefas;
- Cadastro, edição, exclusão e conclusão de tarefas;
- Listagem separada por pendentes e concluídas;
- Persistência das tarefas por usuário no Firestore, mantendo cada conta com sua própria agenda;
- Logout seguro, removendo os dados do usuário do armazenamento local e redirecionando para a página inicial.

Em termos práticos, o fluxo da aplicação funciona assim:

1. O usuário entra com email e senha na tela inicial;
2. O sistema autentica o acesso usando Firebase Authentication;
3. Após login, a aplicação redireciona o usuário para a página de tarefas;
4. Cada tarefa é salva no banco do usuário autenticado;
5. O usuário pode criar uma nova tarefa, edita-la, alternar o status de conclusão ou até mesmo exclui-la.

## Stack tecnológica

- React
- TypeScript
- Vite
- Firebase Authentication
- Firestore
- React Router
- Tailwind CSS
- Lucide React

## Estrutura principal

- `src/pages/Login` — tela de autenticação
- `src/pages/Tasks` — gestão da lista de tarefas
- `src/components/TaskCard` — card de tarefa com ações de editar, concluir e excluir
- `src/services/firebaseConnection.ts` — configuração do Firebase
- `src/routes/Private.tsx` — proteção de rotas privadas

## Configuração do Firebase

O app precisa das variáveis abaixo para inicializar o Firebase.

### Desenvolvimento local

Copie o arquivo `.env.example` para `.env.local` e preencha os valores da configuração do app Web do Firebase Console:

```sh
cp .env.example .env.local
```

O arquivo `.env.local` fica no ambiente local e é ignorado pelo Git. Não adicione valores reais ao `.env.example`.

As variáveis esperadas são:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

> As variáveis com prefixo `VITE_` são incorporadas ao JavaScript enviado ao navegador. Por isso, use apenas dados de configuração pública do app Web e proteja o acesso a dados sensíveis com Firebase Security Rules.

### Deploy na Vercel

No projeto da Vercel, acesse **Settings > Environment Variables** e cadastre cada variável listada no `.env.example`, com o valor correspondente da configuração do app Web do Firebase. Depois, selecione os ambientes desejados e faça um novo deploy.

## Como rodar localmente

1. Instale as dependências:

```sh
npm install
```

2. Crie o arquivo de ambiente local com a configuração do Firebase:

```sh
cp .env.example .env.local
```

3. Inicie o servidor de desenvolvimento:

```sh
npm run dev
```

4. Acesse a aplicação em `http://localhost:5173`.

## Scripts disponíveis

```sh
npm run dev
npm run build
npm run lint
npm run preview
```

## Observações

Esta aplicação foi pensada como um gerenciador simples e prático de tarefas pessoais, com foco em produtividade, organização e experiência leve para uso diário.

