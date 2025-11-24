import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Configurações otimizadas para Vercel */
  productionBrowserSourceMaps: false, // Desabilitar source maps em produção
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  poweredByHeader: false, // Remover header X-Powered-By
  compress: true, // Ativar compressão gzip
  generateEtags: true,
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
