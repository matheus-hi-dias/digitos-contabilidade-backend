<h1 style="text-align: center;">📌 Backend - Gerenciador de documentos contábeis 📌</h1>

## Sumário
- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Como iniciar o projeto?](#como-iniciar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Deploy](#deploy)


## Sobre o projeto

Esse projeto consiste no desenvolvimento de um backend em React para gerenciar documentos em uma empresa de contabilidade. O objetivo principal é facilitar a vida do usuário, digitalizando seus documentos, enquanto oferece uma interface intuitiva e eficiente para seu uso no dia a dia.<br>
Ele ainda está em desenvolvimento e o objetivo é que, em breve, o usuário consiga armazenar os documentos no banco de dados da aplicação.

## Tecnologias utilizadas
<img src="https://img.shields.io/static/v1?label=Linguagem&message=JavaScript&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=Runtime&message=Node.js&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=auth&message=jsonwebtoken&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=encrypt&message=bcrypt&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=framework&message=express&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=querybuilder&message=knex&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=db&message=prostgresql&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=orm&message=supabase&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=test&message=Jest js&color=007E84&style=for-the-badge"/><br>

<details>
<summary>Mais informações das tecnologias</summary>

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript): uma linguagem que permite a construção de servidores web eficientes e escaláveis com um ambiente de execução assíncrono e orientado a eventos.
- [Node.js](https://nodejs.org/): um ambiente de execução JavaScript do lado do servidor.
- [JSON Web Tokens (JWT)](https://jwt.io/): um padrão para autenticação e autorização baseado em tokens.
- [bcrypt](https://www.npmjs.com/package/bcrypt): uma biblioteca para o Node.js que permite a criptografia de senhas.
- [Express.js](https://expressjs.com/): um framework web para Node.js, utilizado para a criação de rotas e manipulação de requisições HTTP.
- [Knex.js](http://knexjs.org/): um construtor de consultas SQL para Node.js que suporta vários bancos de dados relacionais.
- [PostgreSQL](https://www.postgresql.org/): um sistema gerenciador de banco de dados relacional.
- [Supabase](https://supabase.io/): uma plataforma que fornece infraestrutura e serviços para desenvolvimento de aplicativos com PostgreSQL.
- [Jest](https://jestjs.io/): uma estrutura de teste de JavaScript para testar aplicações e bibliotecas.

</details>
<br>

## Funcionalidades

1. Autenticação e autorização: registro e autenticação de usuários através de tokens JWT.

2. Permissões: o usuário só consegue acessar partes do site que estejam incluídas nas permissões do seu cargo ou pessoais.

3. Gerenciamento de cargos: o usuário com a devida permissão pode gerenciar os cargos existentes e suas permissões no sistema.

4. Gerenciamento de usuários: somente o usuário com as devidas permissões pode gerenciar novos usuários no sistema, com seus dados completos, inclusive senha.

5. Gerenciamento de clientes: usuário com as devidas permissões pode gerenciar os dados dos clientes da empresa de contabilidade.

6. Gerenciamento de tipo do documentos: usuário com as devidas permissões pode gerenciar o tipo do documento e definir quantos anos ele deve ser armazenado.

7. Gerenciamento de natureza do documentos: usuário com as devidas permissões pode gerenciar se o documento é de natureza digital ou física.

8. Gerenciamento de local do documentos: usuário com as devidas permissões pode gerenciar o local que o documento está armazenado.

9. Gerenciamento de documentos: usuário com as devidas permissões pode gerenciar os dados dos documentos. É possível pesquisar e filtrar os documentos

## Como iniciar o projeto?
### Pré-requisitos
- [Git](https://git-scm.com)
- [Node.js >= 18.17.1](https://nodejs.org/en/)
### Instalação
1. Clone o projeto do repositório:
   ```
   git clone https://github.com/im-mhid/digitos-contabilidade-backend.git
   ```
2. Acesse a pasta do projeto::
   ```
   cd digitos-contabilidade-backend
   ```
3. Instale as dependências do projeto:
   ```
   npm install
   ```
4. Configure o arquivo .env com as credenciais do seu banco de dados

5. Execute as migrações do banco de dados usando o Knex:
   ```
   npx knex migrate:latest
   ```
6. Inicie o projeto:
   ```
   npm start
   ```
## Deploy

Realizado na plataforma [vercel](https://vercel.com/)
