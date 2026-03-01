# 🎥 Automação de Testes - Reprodução de Vídeo

![Cypress Tests](https://github.com/ThamiresMarina/squad-145-sprint-03-automacao-video-aula/actions/workflows/ci.yml/badge.svg)

Projeto de automação de testes E2E para validação de reprodução de vídeo no curso **Preparatório CTFL** da plataforma [Iterasys](https://iterasys.com/), desenvolvido com **Cypress** e **Cucumber (Gherkin)**.

---

## 📋 Cenários Cobertos

### Feature: Reprodução de Vídeo

| ID | Cenário | Status |
|---|---|---|
| CT01 | Validação de carregamento inicial do vídeo | ✅ Aprovado |
| CT02 | Validação de reprodução contínua sem travamentos | ✅ Aprovado |
| CT03 | Validação de comportamento do vídeo em rede lenta (Slow 3G) | ✅ Aprovado |

**Pré-condição de todos os cenários:** Usuário autenticado com acesso ao curso Preparatório CTFL.

---

## 🛠️ Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) — framework de testes E2E
- [cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) — integração com Gherkin/Cucumber
- [GitHub Actions](https://github.com/features/actions) — pipeline de CI/CD

---

## 📁 Estrutura do Projeto

```
├── cypress/
│   ├── e2e/
│   │   ├── login.feature       # Cenários em Gherkin
│   │   └── login.js            # Step definitions
│   ├── fixtures/
│   │   └── example.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline GitHub Actions
├── .gitignore
├── cypress.config.js
├── cypress.env.json            # ⚠️ NÃO subir para o repositório
├── package.json
└── README.md
```

---

## ⚙️ Pré-requisitos

- Node.js instalado
- npm instalado

---

## 🚀 Como Rodar Localmente

**1. Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

**2. Instale as dependências:**
```bash
npm install
```

> ⚠️ O `node_modules` não é versionado. Sempre rode `npm install` ao clonar o projeto.

**3. Crie o arquivo de variáveis de ambiente:**

Crie o arquivo `cypress.env.json` na raiz do projeto:
```json
{
  "email": "seu-email@exemplo.com",
  "senha": "sua-senha"
}
```

> ⚠️ Este arquivo está no `.gitignore` e **nunca deve ser commitado**.

**4. Abra o Cypress:**
```bash
npx cypress open
```

**5. Ou rode em modo headless:**
```bash
npx cypress run --browser chrome
```

---

## 🔒 Variáveis de Ambiente

As credenciais são gerenciadas via variáveis de ambiente para não ficarem expostas no repositório.

| Variável | Descrição |
|---|---|
| `email` | E-mail do usuário de teste |
| `senha` | Senha do usuário de teste |

**Localmente:** configure no `cypress.env.json`

**Na pipeline:** configure como Secrets no GitHub:
`Settings → Secrets and variables → Actions → New repository secret`

| Secret | Descrição |
|---|---|
| `CYPRESS_EMAIL` | E-mail do usuário de teste |
| `CYPRESS_SENHA` | Senha do usuário de teste |

---

## 🔄 Pipeline CI/CD

O projeto possui integração com **GitHub Actions**. Os testes são executados automaticamente a cada `push` ou `pull request` na branch `main`.

As evidências (screenshots e vídeos) são salvas como artefatos e ficam disponíveis para download na aba **Actions** do repositório.

---

## 📌 Observações Técnicas

- O `cy.on('uncaught:exception', () => false)` é utilizado para ignorar erros do JavaScript da aplicação que não são relacionados aos cenários testados.
- O CT03 utiliza o protocolo CDP (Chrome DevTools Protocol) para simular rede lenta (Slow 3G), com latência de 2000ms e throughput de 500kb/s.
- O vídeo está hospedado em um iframe externo (Vimeo), por isso o assert valida a presença e visibilidade do player, não o estado interno de reprodução.
- O `about:blank` que aparece momentaneamente durante a execução é um comportamento interno do Cypress durante navegação entre páginas e não representa nenhum erro na aplicação.
- O `pageLoadTimeout` está configurado para 120 segundos para acomodar o carregamento em condições de rede lenta no CT03.