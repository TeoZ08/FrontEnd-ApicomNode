# Interface para API de Usuários com React

Este é o repositório do front-end para consumir e interagir com a [API de Usuários com Node.js](https://github.com/TeoZ08/BackEnd-APIcomNode). A interface permite cadastrar, visualizar, atualizar e deletar usuários de forma visual e intuitiva.

O projeto foi desenvolvido com React e Vite, utilizando a biblioteca `axios` para as requisições HTTP.

## ✨ Funcionalidades

-   [x] **Formulário** para cadastro de novos usuários.
-   [x] **Listagem** em tempo real de todos os usuários cadastrados.
-   [x] Interface para **deletar** um usuário da lista.
-   [x] Comunicação direta com a API de back-end.

## 🛠️ Tecnologias Utilizadas

-   [React.js](https://react.dev/)
-   [Vite](https://vitejs.dev/) - Ferramenta de build e desenvolvimento
-   [Axios](https://axios-http.com/) - Cliente HTTP para fazer as requisições à API
-   CSS puro para estilização.

## ⚙️ Pré-requisitos

-   [Git](https://git-scm.com)
-   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
-   [npm](https://www.npmjs.com/)
-   **O back-end da API precisa estar rodando localmente.** (Siga as instruções [deste repositório](https://github.com/TeoZ08/BackEnd-APIcomNode)).

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/TeoZ08/FrontEnd-ApicomNode.git](https://github.com/TeoZ08/FrontEnd-ApicomNode.git)
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd FrontEnd-ApicomNode
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Acesse a aplicação:**
    -   O terminal mostrará uma URL local (geralmente `http://localhost:5173`).
    -   Abra essa URL no seu navegador para ver a aplicação funcionando.

**Importante:** Para que o front-end consiga listar, criar ou deletar usuários, o servidor do **back-end precisa estar rodando ao mesmo tempo** em `http://localhost:3000`.

---
*Este projeto foi criado como parte de um estudo prático sobre o desenvolvimento full-stack com Node.js e React.*
