import type { NextConfig } from 'next';

const config: NextConfig = {
  // SEC: o dashboard do lojista não anuncia o servidor.
  poweredByHeader: false,
  typedRoutes: true,
};

export default config;
