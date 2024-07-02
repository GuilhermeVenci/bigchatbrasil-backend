# Backend do Projeto BCB – Big Chat Brasil

## Descrição

Este projeto é o backend do sistema BCB – Big Chat Brasil, um enviador de SMS e outras mensagens para clientes brasileiros. Ele foi desenvolvido utilizando Node.js com NestJS e PostgreSQL. O sistema permite que os clientes enviem mensagens para seus usuários finais.

## Funcionalidades

- Cadastro de clientes
- Envio de SMS e mensagens via WhatsApp

## Tecnologias Utilizadas

- **Backend**: Node.js com NestJS
- **Banco de Dados**: PostgreSQL
- **Outras Tecnologias**: Docker, Docker Compose

## Pré-requisitos

- Node.js (v14 ou superior)
- Docker e Docker Compose
- PostgreSQL

## Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto.

### 1. Clonar o repositório

```
git clone https://github.com/guilhermevenci/bigchatbrasil-backend.git
cd bigchatbrasil-backend
```

### 2. Clonar o repositório

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL=postgresql://user:password@localhost:5432/bcb
JWT_SECRET=sua_chave_secreta
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=
POSTGRES_PORT=
```

### 3. Instalar dependências

```
npm install
```

### 4. Executar as migrações do banco de dados

```
npx prisma migrate dev
```

### 5. Iniciar o servidor

```
Copiar código
npm run start:dev
```

### 6. Executar o projeto com Docker

Alternativamente, você pode executar o projeto utilizando Docker:

```
docker-compose up
```

## Estrutura do Projeto

```
bcb-backend/
├── src/
│   ├── auth/
│   ├── client/
│   ├── message/
│   ├── user/
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
├── prisma/
│   ├── schema.prisma
├── .env
├── docker-compose.yml
├── package.json
├── README.md
```

## Rotas da API

### Autenticação

- POST /auth/signup: Cadastro de novo usuário
- POST /auth/login: Login do usuário
- GET /me: Obter o usuário logado

### Clientes

- POST /clients
  : Criar um novo cliente
- GET /clients/:id
  : Obter detalhes de um cliente específico
- GET /clients/user/:userId
  : Obter cliente por ID de usuário
- PUT /clients/:id
  : Atualizar informações de um cliente
- PUT /clients/add-credits
  : Adicionar créditos a um cliente
- PUT /clients/set-limit
  : Definir limite de um cliente
- PUT /clients/set-plan
  : Definir plano de um cliente
- POST /clients/native
  : Criar um novo cliente nativamente
- GET /clients/native/:id
  : Obter detalhes de um cliente nativamente
- GET /clients/native/user/:userId
  : Obter cliente por ID de usuário nativamente
- PUT /clients/native/:id
  : Atualizar informações de um cliente nativamente

### Mensagens

- GET /messages: Consultar uma mensagem enviada por um cliente
- GET /messages/user: Consultar as mensagens enviadas por um cliente
- POST /messages: Enviar uma nova mensagem

## Usuários

- POST /users: Criar um novo usuário
- GET /users/:id
  : Obter detalhes de um usuário específico
- PUT /users/:id
  : Atualizar informações de um usuário
- DELETE /users/:id
  : Deletar um usuário

## Boas Práticas

- Documentação e comentários apenas quando necessário para entendimento do negócio
- Utilização de DTOs para transferência de dados entre camadas
- Manutenção da organização e legibilidade do código
