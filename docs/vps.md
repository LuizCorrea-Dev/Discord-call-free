# Hospedar no Render

Este é o caminho recomendado para deixar a Sala de Tela no ar sem depender do seu próprio computador ligado. O Render oferece hospedagem de aplicações Node.js e permite usar WebSockets, sendo a melhor alternativa gratuita / barata para essa aplicação.

Como essa aplicação atua como um relay de vídeo (a saída é `bitrate × espectadores`), serviços como Vercel ou Netlify (que são Serverless) não funcionam. O Render cria um container contínuo que mantém a comunicação em tempo real funcionando perfeitamente sem injetar headers como `X-Frame-Options` que bloqueiam Iframes do Discord.

## 1. Preparando o Código no GitHub

O Render precisa ler o código do seu repositório.

1. Acesse o [GitHub](https://github.com) e faça login.
2. Crie um novo repositório (pode ser privado).
3. Suba todo o código deste projeto para o GitHub. (Garanta que o `.env` **NÃO** seja enviado — ele já está na lista de ignorados do `.gitignore`, então basta não forçar).

## 2. Criando o Web Service no Render

1. Acesse o painel do [Render](https://dashboard.render.com/) e clique em **New +** > **Web Service**.
2. Selecione **Build and deploy from a Git repository**.
3. Conecte sua conta do GitHub e escolha o repositório que você acabou de criar.

## 3. Configurando a Aplicação

Na tela de configuração do serviço, preencha os dados:

- **Name:** Escolha o nome que quiser (ex: `sala-de-tela`).
- **Environment:** `Node`
- **Region:** Selecione a mais próxima (geralmente US East ou West, ou a de sua preferência).
- **Branch:** `main` (ou `master`).
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** Selecione `Free` ou qualquer plano pago (lembrando que a banda para vídeo no plano gratuito tem um limite mensal).

## 4. Variáveis de Ambiente (Environment Variables)

Ainda na tela de criação (ou indo em **Environment** nas configurações do serviço após criá-lo), role até **Environment Variables** e clique em **Add Environment Variable**. 

Adicione os valores do seu `.env` local. Você precisa preencher:

```
NODE_ENV = production
SESSION_SECRET = <cole o seu segredo longo aqui>
DISCORD_CLIENT_ID = <cole o seu ID>
DISCORD_CLIENT_SECRET = <cole o seu Secret>
```

> **Importante:** Defina `NODE_ENV` como `production`. Isso é exigido para rodar de forma segura fora do seu computador.

Clique em **Create Web Service** ou **Save Changes**.

## 5. Mapeando a URL Pública e Discord Portal

Durante a inicialização, o Render criará um domínio pra você, por exemplo: `https://sala-de-tela-xyz.onrender.com`.

Copie esse link completo. Você precisa informá-lo para a aplicação e para o Discord:

### No Render:
1. Vá na aba **Environment** do seu Web Service.
2. Adicione ou edite a chave `PUBLIC_ORIGIN` com a URL do Render:
   `PUBLIC_ORIGIN` = `https://sala-de-tela-xyz.onrender.com`
3. O Render vai reiniciar o app.

### No Discord Developer Portal:
1. Acesse https://discord.com/developers/applications e abra o seu aplicativo.
2. Vá em **Activities** → **URL Mappings**.
   - Coloque o prefixo `/` apontando para o seu Target: `sala-de-tela-xyz.onrender.com` (apenas o domínio, sem `https://`).
3. Vá em **OAuth2** → **Redirects**.
   - Adicione o link de callback: `https://sala-de-tela-xyz.onrender.com/auth/callback`
4. Salve as alterações no final de cada tela.

## 6. Tudo pronto!

Feche o Discord e abra novamente. Entre num canal de voz, inicie sua atividade clicando no foguete, e ela agora deve carregar instantaneamente, servida direto pelo Render 24h por dia.

## Quando algo der errado

Se a atividade abrir com uma tela branca ou falhar em autenticar:
- Verifique os **Logs** do Render para ver mensagens de erro de permissão ou falhas de configuração.
- Certifique-se de que o *Target* no portal do Discord esteja sem `https://`, mas que a URL de Redirect e o `PUBLIC_ORIGIN` estejam com `https://`.
