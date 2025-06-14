# API de Seleções e Jogadores (Projeto Full-Stack)

## 📝 Descrição

Este é um projeto full-stack desenvolvido como trabalho acadêmico, com o objetivo de criar uma API RESTful completa e segura e uma interface de usuário (front-end) para consumi-la. O núcleo do projeto é a implementação de um relacionamento **1:N (um para muitos)** entre duas entidades principais: **Seleções** de futebol e **Jogadores**.

O back-end gerencia todos os dados e a lógica de negócio, incluindo um sistema de autenticação com Tokens JWT. O front-end, construído em Angular, oferece uma interface reativa e amigável para interagir com a API, permitindo que usuários autenticados realizem todas as operações de CRUD para ambas as entidades.

## ✨ Funcionalidades

  - ✅ **Autenticação de Usuário:** Sistema completo de registro e login com Tokens JWT.
  - ✅ **Proteção de Rotas:** Apenas usuários autenticados podem gerenciar seleções e jogadores.
  - ✅ **CRUD de Seleções:** Funcionalidades completas para Criar, Listar, Ver, Atualizar e Deletar seleções.
  - ✅ **CRUD de Jogadores:** Funcionalidades completas para Criar, Listar, Ver, Atualizar e Deletar jogadores, com associação obrigatória a uma seleção.
  - ✅ **Validação de Dados:** As entradas da API são validadas para garantir a integridade dos dados.
  - ✅ **Tratamento de Erros:** Sistema centralizado para tratamento de erros, provendo feedback claro e seguro.
  - ✅ **Interface Reativa:** Front-end construído como uma Single-Page Application (SPA) com Angular.

## 🛠️ Tecnologias Utilizadas

#### **Back-end (API)**

  - **Node.js:** Ambiente de execução do JavaScript no servidor.
  - **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
  - **Express.js:** Framework web para a construção do servidor e das rotas.
  - **PostgreSQL:** Banco de dados relacional para persistência dos dados.
  - **Docker:** Utilizado para criar um ambiente de banco de dados consistente e isolado.
  - **TypeORM:** ORM (Object-Relational Mapper) para a interação com o banco de dados.
  - **JWT (JSON Web Token):** Para a geração de tokens de autenticação.
  - **Bcrypt.js:** Para a criptografia de senhas.
  - **Celebrate / Joi:** Para a validação de dados de entrada da API.

#### **Front-end (Aplicação Web)**

  - **Angular (v15):** Framework para a construção da interface de usuário.
  - **TypeScript:** Linguagem principal do Angular.
  - **HTML & CSS:** Para a estrutura e estilização das páginas.
  - **Angular Router:** Para a navegação entre as "páginas" da SPA.
  - **Angular Services & HttpClient:** Para a comunicação com a API de back-end.

## 📂 Estrutura do Repositório

O projeto está organizado em duas pastas principais:

```
/
├── 📄 README.md
├── 📁 api-selecoes/      # Contém todo o código da API Node.js
└── 📁 front-api-selecoes/ # Contém todo o código da aplicação Angular
```

## 🚀 Instalação e Execução

### Pré-requisitos

Antes de começar, você precisará ter instalado na sua máquina:

  - [Node.js](https://nodejs.org/en/) (recomenda-se usar o [NVM](https://github.com/nvm-sh/nvm) para gerenciar as versões)
  - [Docker](https://www.docker.com/products/docker-desktop/)
  - [Angular CLI v15](https://angular.io/cli) (`npm install -g @angular/cli@15`)
  - Um cliente de API como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) (para testar a API diretamente).

### 📦 Back-end (API)

1.  **Navegue até a pasta do back-end:**

    ```bash
    cd api-selecoes
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o container do PostgreSQL com Docker (execute apenas na primeira vez):**

    ```bash
    sudo docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
    ```

    *Se o container já existir mas estiver parado, inicie-o com `docker start postgres`.*

4.  **Crie o banco de dados:** Use uma ferramenta como DBeaver ou pgAdmin para criar um novo banco de dados chamado `api_selecoes` no seu servidor PostgreSQL local.

5.  **Execute as migrations para criar as tabelas:**

    ```bash
    npm run typeorm migration:run
    ```

6.  **Inicie o servidor da API:**

    ```bash
    npm run dev
    ```

    🎉 O back-end estará rodando em `http://localhost:3333`.

### 🖥️ Front-end (Angular)

1.  **Abra um novo terminal.**

2.  **Navegue até a pasta do front-end:**

    ```bash
    cd front-api-selecoes
    ```

3.  **Garanta que você está usando a versão correta do Node.js (se estiver usando NVM):**

    ```bash
    nvm use 18
    ```

4.  **Instale as dependências:**

    ```bash
    npm install
    ```

5.  **Inicie o servidor de desenvolvimento do Angular:**

    ```bash
    ng serve
    ```

    🎉 O front-end estará disponível no seu navegador em `http://localhost:4200`. A aplicação se conectará automaticamente à API que está rodando.


Feito por **[Eduardo Larson]** 👋
