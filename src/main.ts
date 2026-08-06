// Ponto de entrada do dashboard do lojista. O sprint que primeiro tocar neste repo instala o
// framework de UI e porta os tokens do wiza-ds.css para src/styles/ (ver platform/harness/SPRINTS.md).
export const APP_NAME = 'wiza-lojista';

export function bootstrapBanner(): string {
  return `${APP_NAME}: esqueleto sem features — ver platform/harness/SPRINTS.md`;
}

console.log(bootstrapBanner());
