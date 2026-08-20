# CLAUDE.md — repo `lojista`

Complementa os invariantes da plataforma (`../CLAUDE.md`), que prevalecem sempre.

## O que este repo é

Dashboard do lojista: produtos, pedidos, entregas, mensagens, faturação, equipa. Papéis
Proprietária / Gestora / Entregas — cada ecrã declara o papel exigido e os testes cobrem o acesso
negado.

**Não depende de nenhum outro repo.** Os tipos da API são declarados aqui, o CSS é deste repo e as
strings pt-AO também. Duplicação com `admin/` e `storefront/` é esperada — não criar packages,
submodules nem scripts de sincronização.

## Estrutura

```
src/app/                  raiz: html, fontes, tema (sem shell)
src/app/(dashboard)/      route group com sidebar + topbar
src/app/indice/           mapa do protótipo — página autónoma, sem sidebar
src/features/<feature>/   uma feature não importa de outra (erro de lint), só de si e de shared
src/shared/               transversal ao repo (contracts zod, i18n, shell)
src/shared/ui/            componentes do shadcn — é aqui que o CLI os escreve
src/shared/lib/utils.ts   o `cn()` que os componentes do shadcn importam
src/styles/globals.css    tokens do wiza-ds.css portados + ponte para os nomes do shadcn
```

Rede só em `api.ts` dentro de cada feature; nunca guardar tokens no `localStorage` (cookies
HttpOnly emitidos pela API).

## Comandos

```bash
pnpm install && pnpm prepare
pnpm dev                       # next dev (Turbopack) em http://localhost:3000
pnpm lint | typecheck | test | build
pnpm dlx shadcn@latest add <componente>
```

## Estado atual

Next.js 16 (App Router, Turbopack) + React 19 + Tailwind 4 + shadcn. Está de pé o **shell**:
sidebar colapsável (`src/shared/shell/`) e a página **Resumo**. Sem mais features.

A sidebar lista **só as áreas que já têm página** — o `nav.ts` é a lista, e acrescentar uma entrada
sem o ecrã por trás viola a regra de não haver stubs. As outras seis áreas da spec (§1.1–1.6)
entram uma a uma. O estado colapsado persiste em **cookie** (`sidebar_state`), lido no servidor
pelo `layout.tsx` para o primeiro render não saltar; isso torna as rotas dinâmicas, o que é o
esperado num dashboard autenticado.

O `eslint.config.mjs` isenta `src/shared/ui/**` e `src/shared/hooks/**` de quatro regras de estilo
(`max-lines-per-function`, `complexity`, `no-confusing-void-expression`,
`restrict-template-expressions`): é a saída do CLI do shadcn, que não passa no `strictTypeChecked`
deste repo. As regras de segurança de tipos e as fronteiras continuam a valer, e **código escrito
por nós não deve viver nessas duas pastas**.

**Os tokens já estão portados** para `src/styles/globals.css` — marca, superfícies, estados de
pedido e as duas variantes de tema, copiados de `docs/wiza-ds.css`. O shadcn **não tem paleta
própria aqui**: o bloco `@theme inline` mapeia o vocabulário dele para os tokens da WIZA
(`--color-primary` → `--lima`, `--color-muted-foreground` → `--txt-dim`, …). Ao adicionar
componentes novos, verificar que só usam nomes já presentes nessa ponte — **não acrescentar cores**.

O tema (claro/escuro) comuta pelo botão do `/indice` e persiste no cookie `wiza-theme`, lido no
layout de raiz. **Constantes partilhadas entre servidor e cliente vivem em módulos sem
`'use client'`** (`src/shared/shell/theme.ts`): exportadas de um módulo cliente, o servidor recebe
uma referência de cliente em vez do valor e a leitura do cookie falha em silêncio — foi exatamente
o que aconteceu na primeira versão.

Cinco detalhes que custam a redescobrir:

- O estilo do shadcn é o `base-nova`, que assenta no **Base UI** (`@base-ui/react`), não no Radix. O
  CLI escreve os ficheiros mas não instala esse pacote — se um componente novo falhar com
  `Cannot find module '@base-ui/react/...'`, é preciso um `pnpm add` à mão.
- O tema comuta por `[data-theme]` (escuro por omissão), não pela classe `.dark` do shadcn. A
  reconciliação é a linha `@custom-variant dark` no topo do `globals.css`.
- A Saira é auto-alojada por `next/font/google` no `layout.tsx`, em vez do `@import` do Google Fonts
  que o `wiza-ds.css` usa — sem pedido a terceiros na CSP e sem bloquear o render.
- O design pede **Sansita One** no wordmark; o Google já não a serve como família autónoma (foi
  absorvida na `Sansita`). Usa-se `Sansita` peso 800, o corte equivalente.
- Os ícones do `/indice` **não são do lucide**: `src/shared/ui/icons.tsx` transcreve os desenhos do
  protótipo (objecto `I` do `Índice - WIZA.html`). O lucide tem glifos com o mesmo nome mas traçado
  diferente — a primeira versão usou-o e os 33 cartões deixaram de coincidir com o design. Ecrãs
  portados de um ficheiro de design usam este conjunto; o lucide fica para o resto.

**Onboarding** (`/onboarding`, `src/features/onboarding/`) é a primeira feature ligada à API. Fala
com ela pelo servidor do Next — `api.ts` só é chamado das Server Actions de `actions.ts` e do
componente de servidor da página — por isso o header de tenant nunca passa pelo browser e a API não
precisa de CORS. **A API tem de correr noutra porta que não a 3000**, que é do `next dev`:
`PORT=3001 node dist/main.js`, e `API_BASE_URL` a apontar para lá.

São **três** passos e não os quatro do protótipo. O que ficou de fora ficou por não ter backend:
primeiro produto (não há módulo de produtos), palavra-passe (não há Identity & Access), logótipo e
banner (não há rota de upload) e nome fiscal (não existe no `UpdateFiscalIdentityDto`). A loja é
criada ao sair do passo **Fiscal**, porque `POST /stores` exige o NIF junto com o resto.

O `validation.ts` devolve **códigos de falha, não frases**, e importa o contrato zod e o
formatador por caminho **relativo** (`../../shared/contracts/store.ts`): o `node --test` faz type
stripping e não resolve o alias `@/`, por isso um módulo que o usasse deixava de ser testável. A
tradução para pt-AO fica no `error-messages.ts`.

Falta: autenticação por cookie HttpOnly e as restantes features do dashboard. Sem cores novas, sem
emoji.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
