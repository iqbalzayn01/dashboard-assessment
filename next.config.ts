import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'ruangguru.sdnegerikaradenan01.site',
          },
        ],
        destination: '/login-guru',
        permanent: false,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yaorocydeptsjgwlgmca.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

export default nextConfig;
