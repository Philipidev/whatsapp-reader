# WhatsApp Reader

Leitor e analisador de exportações de chat do WhatsApp, construído em React + Vite + TypeScript + Material UI.  
Permite fazer o upload de um arquivo `.txt` exportado do WhatsApp e navegar “estilo stories” pelas principais estatísticas da conversa.

---

## Funcionalidades

- 📂 **Upload de arquivo** `.txt` com o histórico de chat do WhatsApp  
- 🔗 **Contagem de links** totais  
- 🎵 **Contagem de links de música** (ex.: Spotify)  
- 😊 **Contagem de emojis por tipo**  
- 📝 **Top palavras** mais usadas (excluindo stopwords)  
- 📹 **Tempo total de ligações de vídeo**  
- 🎙️ **Tempo total de ligações de áudio**  
- 👤 **Quantidade de mensagens por autor**  
- 📆 **Dia da semana mais ativo** (maior média de mensagens)  
- 📱 **Navegação mobile-first** estilo “stories” com swipe/clique

---

## Tecnologias

- **Framework**: [React](https://reactjs.org/)  
- **Bundler**: [Vite](https://vitejs.dev/)  
- **Linguagem**: TypeScript  
- **UI**: [Material UI](https://mui.com/)  
- **Parsing & Data**:  
  - [`date-fns`](https://date-fns.org/) para datas  
  - [`linkify-it`](https://github.com/markdown-it/linkify-it) para detecção de URLs  
  - [`emoji-regex`](https://github.com/mathiasbynens/emoji-regex) para emojis  
  - [`stopword`](https://www.npmjs.com/package/stopword) para remoção de stopwords  

---

## Pré-requisitos

- Node.js v14+  
- npm ou yarn

---

## Instalação

1. **Clone este repositório**  
   ```bash
   git clone https://github.com/seu-usuario/whatsapp-reader.git
   cd whatsapp-reader
   ```

2. **Instale as dependências**  
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento**  
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
   Abra http://localhost:3000 no seu navegador.

---

## Estrutura de Pastas

```
whatsapp-reader/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/            # imagens, ícones, etc.
│   ├── components/        # blocos reutilizáveis (FileLoader, StatsCard, ChatNavigator)
│   ├── hooks/             # hook useChatData (parser + métricas)
│   ├── pages/             # UploadPage, StatsPage
│   ├── styles/            # global.css
│   ├── theme/             # muiTheme.ts
│   ├── types/             # interfaces TypeScript (Message, Metrics, etc.)
│   ├── utils/             # parser.ts, metrics.ts
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Principais Scripts

| Comando        | Descrição                              |
| -------------- | --------------------------------------- |
| `npm run dev`  | Inicia o servidor de desenvolvimento   |
| `npm run build`| Compila para produção em `/dist`       |
| `npm run preview` | Visualiza build de produção localmente |

---

## Customização

- Edite o tema em `src/theme/muiTheme.ts` para ajustar cores, tipografia e breakpoints.  
- Adicione ou altere métricas em `src/utils/metrics.ts`.  
- Modifique a navegação “stories” em `src/components/ChatNavigator.tsx`.

---

## Contribuição

1. Faça um _fork_ deste repositório  
2. Crie uma branch de feature (`git checkout -b feature/nome-da-feature`)  
3. Faça commit das suas alterações (`git commit -m 'feat: descrição da feature'`)  
4. _Push_ para sua branch (`git push origin feature/nome-da-feature`)  
5. Abra um Pull Request  
