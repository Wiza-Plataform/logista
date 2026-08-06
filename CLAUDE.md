# CLAUDE.md — repo `lojista`

Complementa os invariantes da plataforma (`platform/CLAUDE.md`), que prevalecem sempre.

## O que este repo é

Dashboard do lojista: produtos, pedidos, entregas, mensagens, faturação, equipa. Papéis
Proprietária / Gestora / Entregas — cada ecrã declara o papel exigido e os testes cobrem o acesso
negado.

**Não depende de nenhum outro repo.** Os tipos da API são declarados aqui, o CSS é deste repo e as
strings pt-AO também. Duplicação com `admin/` e `storefront/` é esperada — não criar packages,
submodules nem scripts de sincronização.

## Estrutura

```
src/features/<feature>/   uma feature não importa de outra (erro de lint), só de si e de shared
src/shared/               transversal ao repo (cliente HTTP, componentes base, strings)
src/styles/               tokens do wiza-ds.css portados para este repo
```

Rede só em `api.ts` dentro de cada feature; nunca guardar tokens no `localStorage` (cookies
HttpOnly emitidos pela API).

## Comandos

```bash
pnpm install && pnpm prepare
pnpm lint | typecheck | test | build
```

## Estado atual

Esqueleto: `src/main.ts` + teste de fumo. O primeiro sprint que tocar neste repo instala o framework
de UI e porta os tokens (accent lima #C0D163, superfícies neutras, radius 14/10px, base 13,5px,
fonte Saira). Sem cores novas, sem emoji.
