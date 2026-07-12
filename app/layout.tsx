import type {Metadata} from 'next'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'
import {site} from '@/lib/site'
import './globals.css'
import './polish.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: {default: site.name, template: `%s | ${site.shortName}`}, description: site.description,
  openGraph: {type: 'website', siteName: site.shortName, title: site.name, description: site.description},
  alternates: {types: {'application/rss+xml': '/rss.xml'}},
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const organisation = {'@context': 'https://schema.org', '@type': 'Organization', name: 'The Redditrepreneur', url: site.main, description: 'A Community Intelligence platform and research company helping businesses understand what online communities say about their brand, competitors and market.'}
  return <html lang="en-GB"><body><Header/><main id="main">{children}</main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(organisation).replace(/</g, '\\u003c')}}/></body></html>
}
