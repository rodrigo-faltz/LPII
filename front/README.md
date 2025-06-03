# ECM252 – Linguagens de Programação II
# ECM516 – Arquitetura de Sistemas Computacionais

## Documentação Front-end

### Índice
1. [Descrição](#descrição)
2. [Diretório](#diretório)
3. [Arquivos Importantes](#arquivos-importantes)

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

## Diretório
<pre>
front/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── Sidebar.tsx
│   │   ├── SubjectCard.tsx
│   │   └── SubjectsSection.tsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.test
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
</pre>

---

---
## Arquivos importantes

## front/index.html

Este é um arquivo HTML básico que serve como o ponto de entrada para a aplicação em questão, construída com Vite e React.

## front/vite.config.js
Esse código é um arquivo de configuração do Vite para o projeto. Ele define as configurações básicas necessárias para o Vite funcionar corretamente com o React.

---
## src/main.jsx
Este código é o ponto de entrada principal da aplicação.

## Funcionalidades
- Usa createRoot para renderizar o componente <App /> dentro de StrictMode;
- Carrega CSS global e do Bootstrap;
- StrictMode ajuda a depurar problemas durante o desenvolvimento.
---

## src/index.css
Este é um arquivo CSS que define os estilos para toda a aplicação, com foco especial em formulários, cards, sidebar e um sistema de chat.

---
## src/App.css
Este código é um arquivo CSS que define os estilos para um componente de teste de API (API Tester) para a aplicação.
### Estrutura Geral
- O CSS está organizado em classes que estilizam:
- O container principal do testador de API;
- Grupos de botões;
- Botões individuais;
- Caixa de exibição de respostas.
---

## src/App.jsx
Este arquivo é o núcleo da aplicação com autenticação e roteamento.

### Estrutura Principal
1. **Configuração de Rotas**:
   - Utiliza `react-router-dom` para gerenciamento de navegação
   - Possui rotas públicas (Login, Registro) e privadas (área logada)

2. **Autenticação**:
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

    ## src/Component/LoadingIndicator.tsx
    Esse é um componente reutilizável que sinaliza operações assíncronas ou telas em espera, podendo ser colocado em qualquer parte da aplicação React.

    - Funcionalidades:
      - Animação de espera — exibe o spinner padrão do Bootstrap, indicado pela bolinha giratória azul, sinalizando “processando”.

      - Mensagem personalizável — mostra um texto logo abaixo do spinner; caso o desenvolvedor não forneça nada, o aviso “Carregando…” é usado como padrão.

      - Centralização e espaçamento — fica alinhado ao centro do contêiner em que for colocado e possui margens internas para manter distância adequada dos demais           elementos.

      - Acessibilidade — inclui um rótulo invisível para leitores de tela, garantindo que usuários com deficiência visual também sejam notificados de que há                 conteúdo sendo carregado.

    ## src/Component/Sidebar.tsx
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
        
    ## src/Component/SubjectCard.tsx
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
    ## src/Component/SubjectSection.tsx
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
