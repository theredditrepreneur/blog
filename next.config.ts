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
      source: '/studio/:path*',
      headers: [
        {key: 'X-Content-Type-Options', value: 'nosniff'},
        {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
        {key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' data: blob: https:; media-src 'self' blob: https:; frame-src https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://core.sanity-cdn.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https: wss:; font-src 'self' data: https:; worker-src 'self' blob:; child-src 'self' blob:; base-uri 'self'; form-action 'self' https:; frame-ancestors 'none'"},
      ],
    },{
      source: '/((?!studio(?:/|$)).*)',
      headers: [
        {key: 'X-Content-Type-Options', value: 'nosniff'},
        {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
        {key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()'},
        {key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' data: https://cdn.sanity.io https://blog.theredditrepreneur.com; media-src 'self' https:; frame-src https://www.youtube-nocookie.com https://www.youtube.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io; font-src 'self'; base-uri 'self'; form-action 'self' https://theredditrepreneur.substack.com; frame-ancestors 'none'; upgrade-insecure-requests"},
      ],
    }]
  },
  async redirects() {
    return [
      {source:'/rss/',destination:'/rss.xml',permanent:true},
      {source:'/tag/frameworks',destination:'/frameworks',permanent:true},
      {source:'/tag/reports',destination:'/research',permanent:true},
      {source:'/tag/case-studies',destination:'/case-studies',permanent:true},
      {source:'/tag/community-intelligence-weekly',destination:'/community-intelligence-weekly',permanent:true},
      {source:'/weekly',destination:'/community-intelligence-weekly',permanent:true},
      {source:'/researchs',destination:'/research',permanent:true},
      {source:'/weeklys',destination:'/community-intelligence-weekly',permanent:true},
      {source:'/case-studys',destination:'/case-studies',permanent:true},
      {source:'/articles',destination:'/research',permanent:true},
      {source:'/indexs',destination:'/community-intelligence-index',permanent:true},
      {source:'/community-intelligence-weekly-3',destination:'/community-intelligence-weekly-the-death-of-social-listening-b2b-saas-community-intelligence-benchmarks-and-more',permanent:true},
    ]
  },
}

export default nextConfig
