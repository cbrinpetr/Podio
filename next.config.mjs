/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cbrin.com.au' },
      { protocol: 'https', hostname: '**.anu.edu.au' },
      { protocol: 'https', hostname: '**.csiro.au' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ]
  },
}

export default nextConfig
