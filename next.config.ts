import type { NextConfig } from 'next';

const config: NextConfig = {
  // SEC: o dashboard do lojista não anuncia o servidor.
  poweredByHeader: false,
  typedRoutes: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '6mb',
    },
  },
};

export default config;
