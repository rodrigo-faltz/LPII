# ECM252 – Linguagens de Programação II
# ECM516 – Arquitetura de Sistemas Computacionais

## Documentação Front-end

### Índice
1. [Descrição](#descrição)
2. [Diretório](#diretório)
3. [Como Rodar o Projeto](#como-rodar-o-projeto)
4. [Arquivos Iniciais](#arquivos-iniciais)
5. [Páginas](#páginas)
6. [Componentes](#componentes)
7. [Serviços](#serviços)
8. [Filtros](#filtros)

---
## Descrição
O front-end do projeto consiste em uma aplicação web responsiva desenvolvida em React, que integra um chatbot inteligente para auxiliar estudantes do ensino médio em suas disciplinas curriculares (Matemática, Português, Ciências, etc.). A interface é projetada para ser intuitiva, acessível e focada na interação natural com o assistente virtual.

---
## Dependências
| Dependência        | Descrição                                                |
| ------------------ | -------------------------------------------------------- |
| React              | Biblioteca base para a construção da interface           |
| React Router DOM   | Navegação entre páginas (roteamento).                    |
| axios              | Cliente HTTP para chamadas externas.                     |
| CSS Modules        | Estilização modularizada dos componentes.                |
| Vite               | Ferramenta moderna para desenvolvimento e build.         |
| Bootstrap          | Fornece classes CSS prontas para estilizar elementos HTML, como botões, tabelas, formulários, entre outros.|

---
## Como Rodar o Projeto

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente em .env:

```.env
DB_NAME = yourdb_test
DB_USER = testuser
DB_PASSWORD = testpassword
DB_HOST = localhost
```

3. Rode o projeto em desenvolvimento:

```bash
python run_servers.py
```

Ao executar o script ```run_servers.py```, tanto o back-end quanto front-end da aplicação serão iniciados automaticamente,
deixando o sistema pronto para uso imediato pelos usuários.

---

## Diretório
<pre>
front
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── components
│   │   ├── ChatList.tsx
│   │   ├── ChatMain.jsx
│   │   ├── EmptyState.tsx
│   │   ├── Filter
│   │   │   ├── FilterBar.tsx
│   │   │   ├── FilterDropdown.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchFilterBar.tsx
│   │   ├── Header.tsx
│   │   ├── HistoryChat.tsx
│   │   ├── LoadingIndicator.tsx
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── Sidebar.tsx
│   │   ├── SubjectCard.tsx
│   │   └── SubjectsSection.tsx
│   ├── hooks
│   │   └── useChatFilters.ts
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── Chat.jsx
│   │   ├── Explore.jsx
│   │   ├── History.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services
│   │   ├── AuthContext.jsx
│   │   └── auth.ts
│   ├── types
│   │   └── index.ts
│   └── utils
│       └── formaters.ts
└── vite.config.js
</pre>

---
## Arquivos Iniciais
Nesta seção será explicado o funcionamento dos arquivos que iniciam o funcionamento da aplicação.

## front/index.html

Este é um arquivo HTML básico que serve como o ponto de entrada para a aplicação em questão, construída com Vite e React.

## front/vite.config.js
Esse código é um arquivo de configuração do Vite para o projeto. Ele define as configurações básicas necessárias para o Vite funcionar corretamente com o React.

## src/main.jsx
Este código é o ponto de entrada principal da aplicação.

## Funcionalidades
- Usa createRoot para renderizar o componente <App /> dentro de StrictMode;
- Carrega CSS global e do Bootstrap;
- StrictMode ajuda a depurar problemas durante o desenvolvimento.


## src/index.css
Este é um arquivo CSS que define os estilos para toda a aplicação, com foco especial em formulários, cards, sidebar e um sistema de chat.


## src/App.css
Este código é um arquivo CSS que define os estilos para um componente de teste de API (API Tester) para a aplicação.
### Estrutura Geral
- O CSS está organizado em classes que estilizam:
- O container principal do testador de API;
- Grupos de botões;
- Botões individuais;
- Caixa de exibição de respostas.


## src/App.jsx
Este arquivo é o núcleo da aplicação com autenticação e roteamento.

### Estrutura Principal
1. Configuração de Rotas:
   - Utiliza `react-router-dom` para gerenciamento de navegação
   - Possui rotas públicas (Login, Registro) e privadas (área logada)

2. Autenticação:
   - Implementa um sistema de autenticação via `AuthProvider`
   - Usa o componente `PrivateRoute` para proteger rotas

### Componentes Principais

#### 1. `AuthProvider`
- Fornece contexto de autenticação para toda a aplicação
- Permite compartilhar estado de autenticação entre componentes

#### 2. `PrivateRoute`
- Componente que protege rotas privadas:
  - Verifica se usuário está autenticado
  - Redireciona para login se não estiver

### Rotas Definidas

#### Rotas Públicas:
- `/` e `/login`: Página de login
- `/criar-conta`: Página de registro

#### Rotas Privadas (protegidas por `PrivateRoute`):
- `/home` e `/home/explorar`: Página principal (Explore)
- `/home/historico`: Página de histórico
- `/home/chat/:id`: Chat específico (com parâmetro dinâmico `id`)
- `/home/subject/:id`: Página de histórico por assunto

### Fluxo de Autenticação
1. Usuário acessa rota pública (login/cadastro)
2. Após autenticação, pode acessar rotas privadas
3. Tentativas de acessar rotas privadas sem autenticação redirecionam para login
---
### Páginas
Nesta seção, será documentado como as páginas invocadas no arquivo src/App.jsx foram criadas. 

## src/pages/Login.jsx

O código presente neste arquivo define um componente React para a página de login.

- Funcionalidades
  - Design Responsivo:
    - Centralização funciona em qualquer tamanho de tela
    - Largura máxima evita que o formulário fique muito largo em telas grandes

  - Hierarquia de Componentes:
    - Este componente é o "shell" da página
    - A lógica do formulário está encapsulada no componente LoginForm

- Boas Práticas
    - Separação de Conceitos:    
    - A página cuida do layout geral    
    - O formulário cuida da lógica específica de autenticação

- Estilização:

    - Combina classes utilitárias do Bootstrap com estilos customizados    
    - Gradiente sutil melhora a experiência visual sem distrair

## src/pages/Register.jsx

O código presente neste arquivo define um componente React para a página de registro (cadastro). É altamente semelhante ao componente de login anterior, mas com algumas diferenças sutis.

Relação com o Componente de Login:
- Reutilização:
  
    - Mesma estrutura de layout
    - Mesmo esquema de cores/gradiente
    - Centralização idêntica
    
- Customizações mínimas:
  
    - Largura diferente para o formulário
    - Componente de formulário específico

Boas Práticas Implementadas:
  - Consistência Visual:
    
    - Mantém a mesma identidade visual do login 
    - Transição suave entre login/cadastro
    - 
  - Componentização:
    
    - Separa claramente a página (layout) do formulário (lógica)
   

## src/pages/Home.jsx

O código presente neste aqruivo define o componente React que monta a página de "Histórico de chats".

-  Funcionalidades:
   - Listar, filtrar e excluir históricos de chat do usuário, mostrando a matéria, data/hora e a última mensagem.

   - Consome quatro endpoints REST (/chat/user/…, /subject/…, /message/chat/…, /message/…, /chat/…).

   - Persistência de estado: mantém o filtro ativo na URL e no state, recarregando dados sempre que algo muda.

## src/pages/Explore.jsx

O código presente neste aqruivo define o componente React monta a página "Explorar disciplinas".

-  Funcionalidades:
  - Exibe todas as disciplinas cadastradas na API para que o usuário explore/conheça novas matérias.
  
- Fluxo de execução: ao montar → consulta /subject/ → popula allSubjects → passa para SubjectsSection.
   
## src/pages/Chat.jsx

Este componente classe é o “invólucro” que coloca a Sidebar, o Header e o componente de conversa ChatMain na tela. Ele administra um pequeno estado local (mensagens digitadas e qual chat está aberto) e delega todo o resto para os componentes filhos.

- Funcionalidades:
  - Detecta o chat atual
    - Extrai o chatId diretamente da rota (/chat/123) para saber qual conversa deve ser carregada.

  - Gerencia estado básico do chat
    Mantém em memória:

      - lista de mensagens da conversa,
      
      - texto que o usuário está digitando,
      
      - navegação ativa da Sidebar,
      
      - chatId e userId.

  - Mensagem de boas-vindas
    Quando o componente monta, insere automaticamente uma saudação do assistente caso o histórico esteja vazio.

- Reage à troca de rota
    Se o usuário navegar para outro chat (URL muda), zera as mensagens e atualiza o chatId, garantindo que cada conversa comece limpa.

- Envia mensagens
    Função handleSendMessage cria um objeto-mensagem (id, conteúdo, remetente, timestamp) e o adiciona ao array; também limpa o campo de entrada para o usuário.

- Passa dados para o chat real
    Renderiza o componente filho ChatMain, entregando mensagens, callbacks, chatId e userId, além de embutir Sidebar e Header para o layout geral.
  
- Layout responsivo
    Estrutura Bootstrap: coluna fixa da Sidebar + coluna flexível com Header e área de chat que ocupa toda a altura da janela.
---

### Componentes
Nesta seção, será documentado como os componentes importados em cada página foram criados.

## src/components/LoginForm.jsx
Esse componente é um formulário de login React que autentica o usuário via API, armazena o token de sessão, oferece feedback de sucesso/erro e redireciona para a área logada depois que a autenticação é concluída.

- Funcionalidades:
  - Configuração global do Axios

    - Define http://localhost:3000/api como baseURL.

    - Todas as requisições subsequentes usam esse endereço automaticamente.

  - Leitura de mensagens vindas da rota

    - Via useLocation, verifica se há state.successMessage (por exemplo, “Conta criada com sucesso”) e exibe-a no topo do cartão.

  - Estados controlados

    - email / password conteúdo dos campos do formulário.
    
    - showPassword true/false para alternar entre “olho” aberto/fechado.
    
    - loading ativa o botão “Carregando…”.
    
    - response guarda textos de erro do backend ou outras mensagens.
    
    - successMessage mostra feedback positivo caso venha da tela anterior.

  - Mostrar / ocultar senha

    - Botão com ícone de olho altera type do <input> entre "password" e "text".

  - Processo de login (handleLogin)

    - Intercepta o submit (não recarrega a página).
    
    - Envia POST /auth/login com email e password.
    
    - Em caso de sucesso:

      - Recebe o token.
      
      - Chama login(token) (service que salva o token no localStorage ou similar).
      
      - Redireciona o usuário para /home via window.location.href.
    
    - Em caso de erro:

      - Se o backend responder com mensagem, exibe-a; caso contrário mostra “Erro inesperado.”

  - Sempre encerra trocando loading para false.

- Interface visual

  - Usa classes Bootstrap para layout de cartão.

  - Campo de e-mail, campo de senha com botão “olho”, botão “Entrar”.

  - Link para a página de cadastro (/criar-conta).

  - Exibe mensagens de sucesso (verde) e de erro (bloco cinza claro).
 
# src/Components/RegisterForm.jsx
Esse componente é um formulário de registro completo que valida dados no cliente, cria a conta via API, trata erros/sucessos e redireciona de forma amigável para o login após cadastro bem-sucedido.

  - Funcionalidades:
    - Configura a API – Define http://localhost:3000/api como baseURL do Axios, para que todas as chamadas usem esse endereço.

    Gerencia estado do formulário
    - Guarda em hooks React: nome de usuário, e-mail, senha, confirmação de senha, flags de exibição dos campos de senha (“mostrar/ocultar”), loading do botão e       mensagens de resposta/erro.
    
    - Validações de client-side
    Antes de enviar:
    
    - Senha e confirmação devem coincidir.
    
    - Senha precisa ter ≥ 8 caracteres.
    
    - Nome de usuário precisa ter ≥ 3 caracteres. Caso falhe, exibe mensagem de erro sem chamar o backend.
    
    - Envio de cadastro (POST /auth/register)
    Se as validações passarem, envia e-mail, senha e nome para o endpoint.
    
      - Sucesso → redireciona para a página de login (/) usando navigate, passando no state uma mensagem de sucesso (“Cadastro realizado…”).
      
      - Erro → exibe a mensagem retornada pelo backend ou “Erro inesperado”.
    
    - Interface do usuário
    
      - Campos: nome completo, e-mail, senha, confirmar senha.
      
      - Ícones de olho para alternar visibilidade das senhas.
      
      - Checkbox obrigatório de aceitação dos termos (links para Termos e Privacidade).
      
      - Botão Criar conta que mostra “Carregando…” enquanto loading for verdadeiro.
      
      - Área inferior exibe feedback (response) com erros ou confirmações.
    
    - Navegação auxiliar
      Link para voltar ao login se o usuário já tiver conta.

    ## src/Components/LoadingIndicator.tsx
    Esse é um componente reutilizável que sinaliza operações assíncronas ou telas em espera, podendo ser colocado em qualquer parte da aplicação React.

    - Funcionalidades:
      - Animação de espera — exibe o spinner padrão do Bootstrap, indicado pela bolinha giratória azul, sinalizando “processando”.

      - Mensagem personalizável — mostra um texto logo abaixo do spinner; caso o desenvolvedor não forneça nada, o aviso “Carregando…” é usado como padrão.

      - Centralização e espaçamento — fica alinhado ao centro do contêiner em que for colocado e possui margens internas para manter distância adequada dos demais           elementos.

      - Acessibilidade — inclui um rótulo invisível para leitores de tela, garantindo que usuários com deficiência visual também sejam notificados de que há                 conteúdo sendo carregado.

    ## src/Components/Sidebar.tsx
    Esse componente exibe uma barra lateral de navegação que mostra o nome da aplicação no topo, lista os botões “Explorar” e “Histórico”, cada um com ícone, destaca visualmente o item correspondente à página atual eleva o usuário à rota certa quando clicado e avisa o restante da aplicação de qual item ficou ativo.

    - Funcionalidades:
      - Navegação lateral fixa:
        - Exibe, à esquerda da tela, uma coluna ocupando cerca de um quarto da largura (col-3) com fundo claro e borda de separação. Nela ficam o título “Stud.IA”             no topo e os itens de menu logo abaixo.

      - Itens de menu
        - Mostra dois atalhos principais:

          - Explorar (ícone de lupa)

          - Histórico (ícone de relógio)
            - Cada item tem um rótulo e um ícone da biblioteca Bootstrap Icons.

      - Integração com o roteador
        - Cada atalho é um link que leva para rotas do tipo /home/explorar ou /home/historico. Isso permite trocar de página sem recarregar o site (React Router).

      - Realce da seção ativa
        - Recebe do componente pai qual menu está atualmente selecionado (activeNav). O item correspondente aparece em azul e em negrito para indicar ao usuário em            que seção ele está.

      - Callback para atualizar o estado externo
        - Quando o usuário clica num item, o componente chama a função setActiveNav, fornecida pelo pai, para que a aplicação registre o novo menu ativo e atualize 
          outras partes da interface conforme necessário.

      - Estrutura semântica simples
        - Usa uma lista vertical (ul/li) para acessibilidade, além de texto de apoio (“Descobrir”) como cabeçalho da seção de navegação.
        
    ## src/Components/SubjectCard.tsx
      Esse o componente representa visualmente uma disciplina e oferece dois atalhos: iniciar um novo chat sobre ela ou ver o histórico de conversas já existentes.

      - Funcionalidades:
        - Cartão de disciplina
          - Mostra a imagem e o título de uma matéria em formato de card; pode aparecer em tamanho “grande” ou “pequeno”, conforme a prop recebida.

          - Criação rápida de chat
            • Ao clicar no cartão, verifica se o usuário está logado; caso contrário, redireciona para a tela de login.
            • Se logado, cria um novo chat na API com o subject_id correspondente.
            • Envia automaticamente a primeira mensagem do assistente (“Bem-vindo ao chat sobre …”) e, em seguida, redireciona o usuário para a página desse chat.

          - Menu de opções (“três pontinhos”)
            • Um botão discreto no canto inferior direito abre/fecha um pequeno dropdown.
            • Opção disponível: “Mostrar Histórico”, que leva o usuário à tela de histórico já filtrada para aquela matéria.

          - Controle interno de estado
            - Mantém um showDropdown para exibir ou esconder o menu sem propagar cliques indesejados para o card.
    ## src/Components/SubjectSection.tsx
    Esse é um contêiner reutilizável que exibe várias disciplinas em formato de grade, com título personalizável e responsividade embutida.
    - Funcionalidade:
      - Agrupa cartões de disciplinas
        - Recebe uma lista de matérias (id, nome, link da imagem) e renderiza um SubjectCard para cada uma.

    - Título da seção
      - Mostra um cabeçalho (h2) com o texto indicado na prop title — por exemplo “Todas as disciplinas”.

    - Grade responsiva
      - Organiza os cartões em uma grade Bootstrap cujas colunas se adaptam conforme o tamanho da tela:

      - número padrão (cols.default)

      - número em telas médias (cols.md)

      - número em telas grandes (cols.lg)

    - Tamanho dos cartões
      - Repassa a prop size (“large” ou “small”) para que cada SubjectCard ajuste seu layout.
     
   ## src/Components/ChatList.tsx
   Esse é um componente reutilizável que apresenta o histórico de chats, com opção de navegação e exclusão individual.
   - Funcionalidade:

   * Lista de conversas
     Recebe um array de objetos-chat; se a lista estiver vazia, exibe um componente de *empty-state* passado pelo pai.
   
   * Exibição de cada chat
     Para cada item mostra:
   
     * a última mensagem (cortada em uma linha, em negrito);
     * um *badge* com o nome da matéria;
     * a linha inteira é clicável e leva à rota `/home/chat/{id}`.
   
   * Exclusão opcional
     Se o pai fornecer a função `onDeleteChat`, cada item ganha um botão “Excluir” que:
   
        1. pede confirmação ao usuário;
        2. chama o callback com o ID do chat selecionado;
        3. impede que o clique no botão acione o link de navegação.
   
   * Layout
     Usa classes Bootstrap: cartões sem borda, `list-group` para a lista, itens com `stretched-link` para tornar toda a área clicável e manter o botão de exclusão funcional.

     ## src/Components/ChatMain.tsx
     Esse componente implementa toda a lógica de exibição, envio e atualização em tempo real do chat, coordenando chamadas REST para persistir mensagens e acompanhar a resposta gerada pela IA.

     - Funcionalidades

      * Interface de conversa
        Exibe as mensagens de um chat (com bolhas alinhadas à direita para o usuário e à esquerda para o assistente) e mantém a rolagem sempre no final quando chegam novas mensagens.
      
      * Envio de mensagens do usuário
        Ao submeter o formulário:
      
        1. Adiciona a mensagem imediatamente à tela (via callback do componente pai).
        2. Salva a mensagem no banco através da API `/message`.
      
      * Criação do fluxo do assistente
        Depois de registrar a mensagem do usuário:
      
        * limpa qualquer *polling* anterior;
        * inicia um *polling* a cada segundo (por até ± 30 s) pedindo o histórico do chat até detectar que surgiu uma resposta do assistente;
        * quando a resposta aparece, encerra o *polling* e desativa o estado “Processando…”.
      
      * Carregamento e sincronização do histórico
      
        * Sempre que o componente monta ou o `chatId` muda, busca toda a conversa na rota `/message/chat/{chatId}`.
        * Converte cada mensagem recebida em objeto próprio (`sender` = user ou assistant) e repassa ao estado do componente pai.
      
      * Verificação de saúde da API
        Faz um ping a `/health` na montagem para confirmar que o backend está online.
      
      * Tratamento de erros
        Mostra alertas se o chat não existir (404) ou se o usuário não tiver permissão (403), redirecionando para o histórico em seguida. Erros gerais geram uma mensagem automática de desculpas do assistente.
      
      * Experiência do usuário
      
        * Botão Enviar exibe spinner e fica desativado enquanto aguarda a resposta do modelo.
        * Campo de texto limpa-se após cada envio.
        * Conteúdo das mensagens suporta Markdown (via `react-markdown`).

 ## src/Components/EmptyState.tsx
Esse componente, em essência, é um aviso de “nada para mostrar”. Ele detecta se o usuário aplicou filtros ou não encontrou conversas e exibe um ícone e uma frase explicando o motivo (filtros sem resultado ou nenhum chat iniciado) e oferece uma ação apropriada: Limpar filtros se busca/filtro estiverem ativos ou ir para “Explorar” para começar a primeira conversa quando não há filtros.

   - Funcionalidades:

   * Tela de “nada encontrado”
     Exibe um ícone e uma mensagem quando não há conversas para mostrar.
   
   * Texto dinâmico
     Mostra duas variantes:
   
     * Se há termo de busca ou filtro aplicado → avisa que nenhum resultado corresponde aos filtros.
     * Caso contrário → informa que o usuário ainda não começou nenhuma conversa.
   
   * Ação contextual
   
     * Quando filtros estão ativos, oferece um botão “Limpar filtros” que dispara o callback `onClearFilters`.
     * Quando não há filtros, exibe um botão “Iniciar uma conversa” que leva o usuário à página de Explorar para começar um novo chat.
   
   * Layout centralizado
     Todo o conteúdo fica alinhado ao centro com espaçamento vertical agradável (`py-5`) e utiliza ícone da biblioteca Bootstrap Icons para reforçar o estado vazio.

## src/Components/Header.tsx
Esse componente é o cabeçalho fixo que identifica o usuário logado, fornece feedback de carregamento e oferece a opção de logout com redirecionamento.

- Funcionalidades:

   * Configuração de API
     Define a URL base do Axios e anexa o token salvo no `localStorage` ao cabeçalho `Authorization`, garantindo que todas as requisições desse componente cheguem autenticadas.
   
   * Busca do perfil
     Assim que o componente monta, faz `GET /auth/profile` para obter nome de usuário e ID.
   
     * Exibe um spinner enquanto a chamada está em andamento.
     * Quando retorna, mostra o nome do usuário na barra e grava `userId` no `localStorage` para que outros componentes possam reutilizá-lo.
   
   * Barra superior (header)
     Fica alinhada à direita com:
   
     1. Username (ou spinner de carregamento).
     2. Um avatar genérico que abre um menu dropdown.
   
   * Dropdown de opções
     Atualmente só contém o item “Sair”. Ao clicar:
   
     * Chama a função `logout()` (que limpa token e dados de sessão).
     * Redireciona imediatamente para `/login`.
   
   * Tratamento de erros
     Guarda mensagens de erro em `state.error` se a requisição ao perfil falhar, embora o texto não seja mostrado na interface (pode ser usado depois).

  ## src/Components/HistoryChat.tsx
  Esse é o contêiner que orquestra carregamento, filtragem, exibição e limpeza do histórico de chats, fornecendo uma experiência completa e responsiva de navegação pelos registros de conversa.
  - Funcionalidades:

      * Centraliza o “Histórico de Conversas”: recebe do componente pai a lista de chats, o filtro de matéria, estados de *loading* e erro e transforma tudo em uma interface completa de pesquisa e gestão.
      
      * Aplica filtros, busca e ordenação: delega a lógica ao hook `useChatFilters`, que mantém:
      
        * texto de busca,
        * filtro de matéria,
        * ordenação (mais recentes ↔ mais antigos),
        * lista de chats já filtrada.
      
      * Sincroniza estado externo com interno: sempre que chegam novas conversas, muda o filtro atual ou o pai sinaliza carregamento/erro, o componente atualiza seus próprios estados (`isLoading`, `error`, `filteredChats`).
      
      * Interface do usuário
      
        1. Cabeçalho fixo – “Histórico de Conversas”.
        2. Barra de busca/filtro – permite digitar, escolher matéria e ordenar.
        3. Conteúdo variável
      
           * Spinner enquanto `loading` for verdadeiro.
           * Alerta de erro se houver falha.
           * Lista de chats (com botão de excluir) quando houver resultados.
           * EmptyState se a lista estiver vazia, oferecendo limpar filtros ou começar nova conversa.
      
      * Funções repassadas ao pai
      
        * Notifica `onFilterChange` sempre que o usuário troca o filtro.
        * Chama `onDeleteChat` quando o usuário opta por excluir uma conversa.

---
# Serviços
Nesta seção será explicado como funcionam os serviços necessários para o funcionamento correto da aplicação.

**src/services/auth.ts**
Esse serviço é um utilitário simples para controlar login, logout e checagem de sessão usando o armazenamento local do navegador.
- Funcionalidades:

   * **`login(token)`** – grava o *token* de autenticação no `localStorage`, marcando o usuário como logado.
      
   * **`logout()`** – remove esse *token* do `localStorage`, encerrando a sessão.
      
   * **`isAuthenticated()`** – verifica se o *token* está presente; devolve `true` se o usuário ainda está autenticado e `false` caso contrário.

**src/services/AuthContext.jsx**
  Esse serviço define um contexto de autenticação para React. Ele cria um estado que verifica se já existe um token no localStorage; se houver, considera o usuário logado. 

  * Funcionalidades:
      
      * Cria um contexto global de autenticação**
        Permite que qualquer componente da aplicação saiba se o usuário está logado e acesse funções de login ou logout sem precisar passar props manualmente.
      
      * Estado interno `authenticated`
        É iniciado verificando se já existe token no `localStorage`.
      
        * `true` → usuário autenticado.
        * `false` → sessão inexistente ou encerrada.
      
      * Função `login(token)`
        Salva o token no `localStorage` e muda o estado para autenticado, propagando a informação a todos os componentes que usam o contexto.
      
      * Função `logout()`
        Remove o token, define o estado como não autenticado e faz com que partes da UI que dependem de login reajam automaticamente.
      
      * Provedor de contexto
        Encapsula a aplicação (ou seção dela) e expõe `{ authenticated, login, logout }` no valor do contexto.
      
      * Hook `useAuth()`
        Facilita o consumo do contexto; basta chamá-lo em qualquer componente para obter o status de autenticação e as funções de login/logout.
      
      ---
    # Filtros

Esse conjunto de arquivos implementa a barra de busca, filtro e ordenação do histórico de conversas. O componente SearchFilterBar agrupa três controles       responsivos: um campo de pesquisa (SearchBar) que captura texto livre, um seletor genérico (FilterDropdown) para filtrar por matéria e outro seletor para ordenar (mais recentes ou mais antigos). O hook useChatFilters recebe a lista bruta de chats, o termo digitado, o filtro de matéria e a ordem escolhida, aplica tudo em tempo real (filtro por matéria, busca pelo termo na matéria ou na última mensagem e ordenação cronológica) e devolve a coleção já filtrada e ordenada, além de setters para que os controles da barra atualizem o estado. Em conjunto, esses componentes fornecem uma interface reutilizável para pesquisar, filtrar e classificar as conversas, destacando apenas os resultados que correspondem aos critérios do usuário.
      
      
      
      
      
