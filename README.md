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

### Clientes

- GET /clients: Listar todos os clientes
- POST /clients: Criar um novo cliente
- GET /clients/
  : Obter detalhes de um cliente específico
- PATCH /clients/
  : Atualizar informações de um cliente
- DELETE /clients/
  : Deletar um cliente

### Mensagens

- GET /messages: Consultar as mensagens enviadas por um cliente
- POST /messages: Enviar uma nova mensagem

### Operações de Backoffice

- POST /backoffice/credits: Incluir créditos para um cliente
- GET /backoffice/balance/
  : Consultar saldo de um cliente
- PATCH /backoffice/limit/
  : Alterar limite de um cliente
- PATCH /backoffice/plan/
  : Alterar plano de um cliente
- GET /backoffice/clients/
  : Ver dados de um cliente

## Boas Práticas

- Documentação e comentários apenas quando necessário para entendimento do negócio
- Utilização de DTOs para transferência de dados entre camadas
- Manutenção da organização e legibilidade do código
