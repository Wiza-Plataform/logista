import {
  Alert,
  Bag,
  Box,
  Card,
  Chart,
  Gear,
  Grid,
  type Icon,
  Money,
  Palette,
  People,
  Rocket,
  Shield,
  Store,
  Tag,
  Trophy,
} from '@/shared/ui/icons';

export interface ScreenTile {
  readonly title: string;
  readonly description: string;
  readonly icon: Icon;
  readonly iconBackground: string;
  readonly iconColor: string;
  readonly route: '/' | '/onboarding' | null;
}

export interface ScreenGroup {
  readonly title: string;
  readonly icon: Icon;
  readonly tiles: readonly ScreenTile[];
}

function softly(token: string): string {
  return `color-mix(in srgb, var(${token}) 16%, transparent)`;
}

const BLUE = { iconBackground: softly('--av-blue'), iconColor: '#76A8E6' };
const ORANGE = { iconBackground: softly('--av-orange'), iconColor: '#E0A85E' };
const PURPLE = { iconBackground: softly('--av-purple'), iconColor: '#A88BE6' };
const GREEN = { iconBackground: softly('--av-green'), iconColor: '#5FBD86' };
const RED = { iconBackground: softly('--av-red'), iconColor: '#E8836F' };
const AMBER = { iconBackground: 'var(--st-wait-bg)', iconColor: 'var(--st-wait-fg)' };
const LIME = { iconBackground: 'var(--active-bg)', iconColor: 'var(--lima-oliva)' };
const PAID = { iconBackground: 'var(--st-paid-bg)', iconColor: 'var(--st-paid-fg)' };
const NEUTRAL = { iconBackground: 'var(--surface-2)', iconColor: 'var(--txt-dim)' };

export const screenGroups: readonly ScreenGroup[] = [
  {
    title: 'Aquisição',
    icon: Rocket,
    tiles: [
      {
        title: 'Landing + Calculadora',
        description: 'Página pública com calculadora de vendas',
        icon: Rocket,
        ...LIME,
        route: null,
      },
      {
        title: 'Onboarding',
        description: 'Criar conta → assistente de 3 passos',
        icon: Store,
        ...PAID,
        route: '/onboarding',
      },
    ],
  },
  {
    title: 'Painel da loja',
    icon: Grid,
    tiles: [
      {
        title: 'Resumo',
        description: 'Dashboard do lojista',
        icon: Grid,
        ...LIME,
        route: '/',
      },
      {
        title: 'Pedidos',
        description: 'Encomendas e estados',
        icon: Bag,
        ...BLUE,
        route: null,
      },
      {
        title: 'Produtos',
        description: 'Catálogo + criar produto',
        icon: Box,
        ...ORANGE,
        route: null,
      },
      {
        title: 'Categorias',
        description: 'Organização do catálogo',
        icon: Grid,
        ...PURPLE,
        route: null,
      },
      {
        title: 'Mercado',
        description: 'Presença no shopping Wiza',
        icon: Store,
        ...PAID,
        route: null,
      },
      {
        title: 'Clientes',
        description: 'CRM de clientes',
        icon: People,
        ...GREEN,
        route: null,
      },
      {
        title: 'Promoções',
        description: 'Cupões e campanhas',
        icon: Tag,
        ...RED,
        route: null,
      },
      {
        title: 'Relatórios',
        description: 'Vendas e métricas da loja',
        icon: Chart,
        ...BLUE,
        route: null,
      },
      {
        title: 'Pagamentos',
        description: 'Recebimentos e repasses',
        icon: Card,
        ...AMBER,
        route: null,
      },
      {
        title: 'Financeiro',
        description: 'Extrato, comissões e dados fiscais',
        icon: Chart,
        ...PURPLE,
        route: null,
      },
      {
        title: 'Equipa',
        description: 'Membros da loja e permissões',
        icon: People,
        ...GREEN,
        route: null,
      },
      {
        title: 'Personalizar loja',
        description: 'Aparência com preview ao vivo',
        icon: Palette,
        ...PURPLE,
        route: null,
      },
      {
        title: 'Definições',
        description: 'Loja, fiscal, entrega, repasses',
        icon: Gear,
        ...NEUTRAL,
        route: null,
      },
    ],
  },
  {
    title: 'Storefront (cliente)',
    icon: Bag,
    tiles: [
      {
        title: 'Mercado',
        description: 'Todas as lojas e produtos · página pública',
        icon: Store,
        ...PAID,
        route: null,
      },
      {
        title: 'Loja',
        description: 'Página pública da loja',
        icon: Store,
        ...PAID,
        route: null,
      },
      {
        title: 'Produto',
        description: 'Detalhe, variantes, add-to-cart',
        icon: Box,
        ...ORANGE,
        route: null,
      },
      {
        title: 'Carrinho',
        description: 'Multi-loja, cupão, totais',
        icon: Bag,
        ...BLUE,
        route: null,
      },
      {
        title: 'Checkout',
        description: 'Entrega + pagamento (AO)',
        icon: Card,
        ...AMBER,
        route: null,
      },
      {
        title: 'Confirmação',
        description: 'Encomenda confirmada',
        icon: Shield,
        ...GREEN,
        route: null,
      },
    ],
  },
  {
    title: 'Admin (operações)',
    icon: Shield,
    tiles: [
      {
        title: 'Resumo',
        description: 'Dashboard global · MRR, GMV',
        icon: Grid,
        ...LIME,
        route: null,
      },
      {
        title: 'Lojas',
        description: 'Gestão de lojas e planos',
        icon: Store,
        ...BLUE,
        route: null,
      },
      {
        title: 'Detalhe da loja',
        description: 'Aprovar, moderar produtos, Mercado',
        icon: Store,
        ...ORANGE,
        route: null,
      },
      {
        title: 'Disputas',
        description: 'Resolução com escrow',
        icon: Alert,
        ...RED,
        route: null,
      },
      {
        title: 'Repasses',
        description: 'Lote quinzenal, comissão 2%',
        icon: Money,
        ...GREEN,
        route: null,
      },
      {
        title: 'Faturação',
        description: 'Mensalidades das lojas (SaaS)',
        icon: Card,
        ...AMBER,
        route: null,
      },
      {
        title: 'Analytics',
        description: 'GMV, funil, métodos, províncias',
        icon: Chart,
        ...BLUE,
        route: null,
      },
      {
        title: 'Equipa',
        description: 'Staff, funções, 2FA, convites',
        icon: People,
        ...GREEN,
        route: null,
      },
      {
        title: 'Configuração',
        description: 'Comissões, pagamentos, SLA, segurança',
        icon: Gear,
        ...PURPLE,
        route: null,
      },
      {
        title: 'Curadoria',
        description: 'Banners e destaques do Mercado',
        icon: Trophy,
        ...AMBER,
        route: null,
      },
      {
        title: 'Categorias do Mercado',
        description: 'Taxonomia global — categorias e subcategorias',
        icon: Grid,
        ...BLUE,
        route: null,
      },
      {
        title: 'Campanhas',
        description: 'Marketing da plataforma',
        icon: Tag,
        ...RED,
        route: null,
      },
    ],
  },
];
