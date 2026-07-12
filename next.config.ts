import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'cdn.sanity.io'},
      {protocol: 'https', hostname: 'blog.theredditrepreneur.com'},
    ],
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        {key: 'X-Content-Type-Options', value: 'nosniff'},
        {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
        {key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()'},
        {key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' data: https://cdn.sanity.io https://blog.theredditrepreneur.com; media-src 'self' https:; frame-src https://www.youtube-nocookie.com https://www.youtube.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io; font-src 'self'; base-uri 'self'; form-action 'self' https://theredditrepreneur.substack.com; frame-ancestors 'none'; upgrade-insecure-requests"},
      ],
    }]
  },
  async redirects() {
    return [{source: '/rss/', destination: '/rss.xml', permanent: true}]
  },
}

export default nextConfig
