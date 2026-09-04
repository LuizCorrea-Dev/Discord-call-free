![Como não compartilhar tela no Discord](como-nao-compartilhar-tela-no-discord-banner.png)

# Sala de Tela

Mostre sua tela para quem está na mesma call do Discord.
Uma pessoa compartilha, todo mundo assiste sem sair do Discord.

Também funciona como site normal, fora do Discord, com salas que você cria e
compartilha por link.

---

## O que você precisa antes

**1. Node.js** — é o programa que faz tudo isso rodar.

Baixe em [nodejs.org](https://nodejs.org), escolha a versão **LTS** e instale
clicando em avançar até o fim. Não precisa configurar nada.

**2. Google Chrome, Edge, Brave ou Opera** — só para quem vai *mostrar* a tela.
Para *assistir*, qualquer navegador serve.

> Não funciona no celular para compartilhar. Celular não deixa nenhum site
> capturar a tela. Assistir pelo celular também costuma falhar.

---

## Ligar tudo (um comando)

**1.** Baixe este projeto e descompacte numa pasta.

**2.** Abra a pasta, clique na barra de endereço do explorador de arquivos,
digite `cmd` e aperte Enter. Vai abrir uma janela preta — é ali que você digita
os comandos.

**3.** Digite, um de cada vez, esperando cada um terminar:

```
npm install
npm run start:fast
```

E pronto. Esse segundo comando faz tudo sozinho: se faltar alguma configuração
ele pergunta na hora, depois monta o site, abre o endereço público e liga o
servidor. **Uma janela só.**

Para desligar, aperte `Ctrl + C` na janela preta. Isso derruba tudo junto.

### Só quero testar no navegador

Se ele perguntar como você quer usar, escolha a opção **sem Discord**. Aí é só
abrir <http://localhost:3001> em duas janelas, criar uma sala numa, entrar pela
outra e clicar em **Compartilhar tela** — você vê sua própria tela chegando do
outro lado.

---

## Usar dentro do Discord

O Discord exige que você registre o programa no site dele. É uma vez só.

Quando o `npm run start:fast` pedir, ele vai te dizer exatamente onde achar cada
valor no site do Discord, e no fim mostra **as coisas para colar lá**, já
preenchidas com os seus dados. Faça o que ele mandar.

Depois, no Discord: entre num canal de voz, clique no **foguete** 🚀 na barra de
baixo e escolha a atividade.

Dentro do Discord não existe lista de salas: quem abre a atividade cai direto na
sala daquela call, junto com o resto do pessoal que está lá.

---

## Painel administrativo

O painel mostra em tempo real pessoas e servidores conectados, salas,
transmissões, banda usada pelo relay, ping, descartes, CPU, memória, disco e
informações do processo/container.

Ative o modo de desenvolvedor no Discord, clique com o botão direito na sua
conta e use **Copiar ID do usuário**. Depois acrescente ao `.env`:

```env
DISCORD_ADMIN_ID=123456789012345678
```

Mais de uma pessoa administrando? Separe os IDs por vírgula:

```env
DISCORD_ADMIN_ID=123456789012345678,987654321098765432
```

O `SESSION_SECRET` é outra variável, e é dela o aviso de "mínimo 32”: o ID do
Discord tem 18 dígitos e está certo assim.

Reinicie o servidor e abra o painel no endereço (`/admin`). O painel pede login
pelo Discord e o backend compara a conta confirmada pelo próprio Discord com o
ID acima. Os endpoints não aceitam um ID enviado pelo navegador e não expõem
Client Secret, Bot Token ou Session Secret.

No Linux, o painel também lê `/proc`, cgroups e o sistema de arquivos para
mostrar tráfego de rede do host/container e limites do container. No Windows,
CPU, memória, disco e todas as métricas da aplicação funcionam; apenas os
contadores globais de rede da máquina ficam indisponíveis.

O nome de um servidor é resolvido com o Bot Token. Quando o bot não estiver
naquele servidor, o painel mostra o Guild ID sem impedir as outras métricas.

---

## Compartilhando com som

O som é sempre pedido — não há nada para ligar antes. Na janela que o navegador
abre, **escolha uma aba** e marque a caixinha de áudio que aparece lá embaixo.

### Por que só aba?

Se você escolher a tela inteira, o computador entrega **todo** o som que está
tocando — inclusive o do Discord. Aí todo mundo na call escuta a própria voz de
volta, com atraso. É insuportável em segundos.

Nenhum navegador consegue tirar um programa específico dessa captura: o som vem
misturado, é tudo ou nada. Por isso, na tela inteira o navegador nem oferece a
caixinha de áudio: a transmissão vai **sem som**.

### Quero mostrar a tela inteira E ter som

Dá. Clique na engrenagem e escolha **"Som de uma aba ou janela"**. O vídeo continua
sendo a tela inteira, e o som passa a vir da aba que você escolher — que é a
única fonte que não carrega o Discord junto.

Serve para YouTube, Twitch, jogo de navegador. Para um jogo instalado, cujo som
não está em aba nenhuma, não tem como — nem aqui nem em qualquer outro site.

Quem assiste passa o mouse no alto-falante da barra de baixo para ajustar o
volume, ou clica nele para silenciar.

> Som funciona no Chrome, Edge, Brave e Opera.

---

## Deu errado?

**A atividade não abre, ou fica só um retângulo branco**
Vá no site do Discord em **Activities → URL Mappings** e garanta que o *Target*
esteja apontando para a URL correta de onde o servidor está hospedado.

**"A porta 3001 já está sendo usada"**
Tem outra janela do programa aberta. Feche a outra e tente de novo.

**O botão de compartilhar abre uma aba e não acontece nada**
Essa aba precisa continuar aberta enquanto você transmite. Pode voltar para o
Discord normalmente, só não feche a aba.

**"npm não é reconhecido como um comando"**
O Node.js não foi instalado, ou a janela preta foi aberta antes da instalação.
Feche a janela, abra de novo e tente outra vez.

**Não sai som**
Abra o botão ⓘ na barra de baixo e olhe a linha **Som**. Ela diz em qual dos
casos você está: sem áudio na transmissão, esperando o áudio, silenciado aí, ou
tocando.

**Quero mudar alguma configuração**
Rode `npm run configurar`. Ele lembra do que você já respondeu — é só apertar
Enter no que não mudou.

**A "Sala da call" não confere quem está no canal de voz**
Isso é opcional e só importa se você quer garantir que apenas quem está na call
consiga entrar. Precisa criar um bot no site do Discord e colar o token dele em
`DISCORD_BOT_TOKEN`, dentro do arquivo `.env`. Sem isso tudo funciona igual.

---

## Deixar no ar direto (usando o Render)

Para deixar a Sala de Tela no ar 24/7 sem depender do seu computador, recomendamos o **Render**:

1. Suba o código do seu projeto para um repositório no **GitHub**.
2. No [Render.com](https://render.com), crie um novo **Web Service** usando seu repositório.
3. Configure os comandos:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Na seção **Environment Variables**, adicione todas as variáveis do seu arquivo `.env` local, mas com duas alterações essenciais:
   - `NODE_ENV` definido como `production`
   - `PUBLIC_ORIGIN` para a URL que o Render criar (ex: `https://seu-projeto.onrender.com`)
5. No portal do Discord, atualize o *Target* e o *Redirect* para a nova URL do Render.

Veja o guia detalhado em [docs/vps.md](docs/vps.md) se quiser mais detalhes sobre deploy.

---

## Comandos, resumidos

| Comando | Para quê |
|---|---|
| `npm install` | Baixa o que o programa precisa. Só na primeira vez. |
| `npm run start:fast` | **Liga tudo.** Configura se faltar, e sobe numa janela só. |
| `npm run configurar` | Refaz as perguntas da configuração. |
| `npm run smoke` | Confere se está tudo funcionando por dentro. |

Para quem mexe no código:

| Comando | Para quê |
|---|---|
| `npm run dev` | Site e servidor juntos, remontando a cada arquivo salvo. |
| `npm start` | Monta o site e sobe só o servidor. |

---

## O que ainda não dá

- **Compartilhar do celular.** Nenhum navegador de celular permite.
- **Som de programa instalado** em tela cheia. Só som de aba (veja acima).
- **Muita gente ao mesmo tempo.** Cada pessoa assistindo consome a qualidade
  escolhida, inteira. Em 2,5 Mb/s, cinco pessoas já são 12,5 Mb/s de subida; em
  8 Mb/s, são 40.
- **60 fps em qualquer computador.** Se o navegador não tiver codificação por
  hardware, ele não dá conta de 60 quadros em tela grande e entrega menos. A
  página de captura avisa quando isso acontece.
- **Mais de 4 telas ao mesmo tempo** na mesma sala.

Se você mexe em código e quer entender as decisões por trás disso,
veja [docs/como-funciona.md](docs/como-funciona.md).
