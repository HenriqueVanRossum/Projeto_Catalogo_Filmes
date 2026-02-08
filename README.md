# 🎬 Catálogo de Filmes (JavaScript)

Aplicação **frontend** desenvolvida com **HTML, CSS e JavaScript puro**, que permite **pesquisar filmes**, visualizar detalhes e **montar uma lista personalizada** utilizando a **API do OMDb** e **localStorage**.

---

## 🚀 Funcionalidades

* 🔎 Pesquisa de filmes pelo nome e ano (API OMDb)
* 📄 Exibição de informações detalhadas do filme em modal
* ➕ Adicionar filmes à lista
* 🗑️ Remover filmes da lista
* 💾 Persistência dos dados no navegador com `localStorage`
* 📂 Carregamento inicial de filmes via arquivo JSON local
* ⚠️ Tratamento de erros (filme não encontrado, campos inválidos)

---

## 📂 Estrutura do projeto

```
Projeto_Catalogo_Filmes/
├── index.html
├── style.css
├── modal.css
├── script.js
├── modal.js
├── API_catalogoFilmes.json
└── src/
    └── notie/
```

---

## 📥 Como clonar o projeto

No terminal:

```bash
git clone https://github.com/HenriqueVanRossum/Projeto_Catalogo_Filmes.git
```

Entre na pasta do projeto:

```bash
cd Projeto_Catalogo_Filmes
```

---

## ▶️ Como rodar localmente

Este projeto **não utiliza backend**.

### Opção recomendada

Use o **Live Server** no VS Code:

1. Abra o projeto no VS Code
2. Clique com o botão direito em `index.html`
3. Selecione **“Open with Live Server”**

> O uso de servidor local é necessário para que o `fetch` do arquivo
> `API_catalogoFilmes.json` funcione corretamente.

---

## 🛠️ Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Fetch API + async/await
* API externa: **OMDb API**
* Biblioteca **Notie** para alertas e confirmações
* LocalStorage para persistência de dados

---

## 🧠 Como o projeto funciona

* Filmes iniciais são carregados do arquivo `API_catalogoFilmes.json`
* Filmes pesquisados via OMDb podem ser adicionados à lista
* A lista do usuário é salva no `localStorage`
* Ao recarregar a página, a lista é restaurada automaticamente
* O sistema evita falhas tratando valores nulos e dados inválidos

---

## 📌 Próximas melhorias (ideias)

* Evitar duplicação de filmes pelo `imdbID`
* Paginação da lista
* Filtro por gênero ou ano
* Versão responsiva para mobile
* Separação mais clara entre lógica, UI e estado

---

## 📄 Observação

Este projeto foi desenvolvido com foco em **aprendizado de JavaScript**, consumo de APIs, manipulação do DOM e gerenciamento de estado no frontend.