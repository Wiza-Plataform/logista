# WIZA — Dashboard do lojista

Interface de gestão da loja: catálogo, pedidos, entregas, mensagens, faturação e equipa.
Repositório autónomo — sem dependências de outros repos da WIZA.

## Arranque

```bash
corepack enable && pnpm install   # pnpm 11, Node >= 22.22.1
pnpm prepare                      # hooks husky
cp .env.example .env.local        # API_BASE_URL
pnpm dev
```

A API tem de estar a correr (repo `api`, por omissão em `http://localhost:3000`).

## Comandos

| Script           | O que faz                                       |
| ---------------- | ----------------------------------------------- |
| `pnpm dev`       | arranca em watch                                |
| `pnpm build`     | compila para `dist/` (exclui testes)            |
| `pnpm lint`      | ESLint — import entre features é erro (ENG-010) |
| `pnpm typecheck` | `tsc --noEmit`                                  |
| `pnpm test`      | testes                                          |

Invariantes de domínio, papéis e design: [`../CLAUDE.md`](../CLAUDE.md).
