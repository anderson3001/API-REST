# 🌐 Social Network API

Este é o backend de uma aplicação de rede social, desenvolvido com foco em performance, escalabilidade e boas práticas. A API REST permite gerenciamento de **usuários, posts, comentários e likes**, sendo ideal para aplicações sociais modernas.

---

## ⚙️ Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Fastify** (servidor web rápido e leve)
- **Prisma ORM** (acesso e manipulação de dados)
- **Docker** (containerização e ambiente isolado)
- **Swagger** (documentação automática da API)

---

## 🧩 Funcionalidades

- 🔐 Cadastro e autenticação de usuários
- 📝 Criação, listagem, edição e exclusão de posts
- 💬 Comentários em posts
- ❤️ Sistema de likes (curtidas)
- 🧾 Documentação completa com Swagger
- 📦 Estrutura modular com `usecases`, `controllers`, `services`

---

## 🚀 Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/anderson3001/API-REST.git
cd API-REST
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# .env.example

# URL de conexão com o banco de dados PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE?schema=public"

# Porta em que o servidor irá rodar
PORT=3000

# Ambiente de execução da aplicação (dev, production, etc.)
NODE_ENV=dev

# Credenciais para envio de email (Nodemailer)
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

# Chave secreta para assinatura dos tokens JWT
JWT_SECRET=your-jwt-secret
```
### 3. Subir o projeto com Docker

Certifique-se de que o Docker e o Docker Compose estão instalados em sua máquina. Se ainda não tiver o Docker, você pode baixá-lo aqui.
Com o Docker instalado, execute os seguintes passos para subir a aplicação com Docker:

#### Crie o arquivo .env a partir do .env.example:

- Faça uma cópia do arquivo .env.example e renomeie para .env.

- Substitua os valores de configuração pelo seu banco de dados e outras credenciais.

#### Subir os containers:

- No diretório raiz do projeto, execute o comando:
```
docker-compose up -d
```
#### Acessar a API:

Após a execução bem-sucedida do Docker, o servidor estará rodando em:
```
http://localhost:3000
```
Acessar a documentação Swagger:

Você pode acessar a documentação interativa da API no seguinte endereço:
````
http://localhost:3000/api-docs
