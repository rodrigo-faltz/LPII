# ECM252 – Linguagens de Programação II
# ECM516 – Arquitetura de Sistemas Computacionais

## Projeto T1 das Disciplinas Linguagens de Programação II e Arquitetura de Sistemas Computacionais

### Membros do Grupo:

- Amanda Carolina Ambrizzi Ramin; 22.00721-0

- André Felipe Silva Xavier; 22.01339-3

- Otto Camargo Kuchkarian; 22.00571-4

- Rafael Assanti; 22.01464-0

- Rodrigo Fernandes Faltz; 21.01660-7

### Índice
1. [Descrição do Projeto](#descrição-do-projeto)
2. [Objetivo](#objetivo)
3. [Pré-requisitos](#pré-requisitos)  
4. [Como Usar](#como-usar)  

---

### Descrição do Projeto

---

### Objetivo

---

### Pré-requisitos

---

### Como usar

---

```
LPII
├─ back
│  ├─ jest.config.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.md
│  ├─ src
│  │  ├─ app.ts
│  │  ├─ config
│  │  │  └─ db.ts
│  │  ├─ consumer
│  │  │  └─ OllamaConsumer.ts
│  │  ├─ controllers
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ chat.controller.ts
│  │  │  ├─ message.controller.ts
│  │  │  ├─ ollama.controller.ts
│  │  │  └─ subject.controller.ts
│  │  ├─ core
│  │  │  └─ MessageBus.ts
│  │  ├─ index.ts
│  │  ├─ middleware
│  │  │  ├─ auth.middleware.ts
│  │  │  ├─ error.middleware.ts
│  │  │  └─ logger.middleware.ts
│  │  ├─ models
│  │  │  ├─ chat.model.ts
│  │  │  ├─ message.model.ts
│  │  │  ├─ subject.model.ts
│  │  │  └─ user.model.ts
│  │  ├─ repositories
│  │  │  ├─ chat.repository.ts
│  │  │  ├─ message.repository.ts
│  │  │  ├─ subject.repository.ts
│  │  │  └─ user.repository.ts
│  │  ├─ services
│  │  │  ├─ auth.service.ts
│  │  │  ├─ chat.service.ts
│  │  │  ├─ message.service.ts
│  │  │  ├─ ollama.service.ts
│  │  │  └─ subject.service.ts
│  │  ├─ test
│  │  │  └─ test-server.ts
│  │  ├─ types
│  │  │  ├─ auth-types.ts
│  │  │  ├─ custom-error.ts
│  │  │  └─ types.d.ts
│  │  ├─ utils
│  │  │  ├─ bcrypt.ts
│  │  │  └─ jwt.ts
│  │  └─ validation
│  │     └─ auth.validator.ts
│  ├─ tests
│  │  ├─ integration
│  │  └─ unit
│  │     └─ services
│  └─ tsconfig.json
├─ front
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ components
│  │  │  ├─ ChatList.tsx
│  │  │  ├─ ChatMain.jsx
│  │  │  ├─ EmptyState.tsx
│  │  │  ├─ Filter
│  │  │  │  ├─ FilterBar.tsx
│  │  │  │  ├─ FilterDropdown.tsx
│  │  │  │  ├─ SearchBar.tsx
│  │  │  │  └─ SearchFilterBar.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ HistoryChat.tsx
│  │  │  ├─ LoadingIndicator.tsx
│  │  │  ├─ LoginForm.jsx
│  │  │  ├─ RegisterForm.jsx
│  │  │  ├─ Sidebar.tsx
│  │  │  ├─ SubjectCard.tsx
│  │  │  └─ SubjectsSection.tsx
│  │  ├─ hooks
│  │  │  └─ useChatFilters.ts
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ Chat.jsx
│  │  │  ├─ Explore.jsx
│  │  │  ├─ History.jsx
│  │  │  ├─ Home.jsx
│  │  │  ├─ Login.jsx
│  │  │  └─ Register.jsx
│  │  ├─ services
│  │  │  ├─ auth.ts
│  │  │  └─ AuthContext.jsx
│  │  ├─ types
│  │  │  └─ index.ts
│  │  └─ utils
│  │     └─ formaters.ts
│  └─ vite.config.js
├─ package-lock.json
├─ README.md
└─ run_servers.py

```