import type {Metadata} from 'next'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'
import {site} from '@/lib/site'
import './globals.css'
import './polish.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: {default: 'The Redditrepreneur Blog | Community Intelligence Articles, Frameworks and Scorecards', template: `%s | ${site.shortName}`}, description: 'Explore original Community Intelligence research, frameworks, Scorecards, case studies, benchmarks and analysis from The Redditrepreneur.',
  openGraph: {type: 'website', siteName: site.shortName, title: 'The Redditrepreneur Blog', description: site.description,images:['/redditrepreneur-logo.png']},
  twitter:{card:'summary_large_image',title:'The Redditrepreneur Blog',description:site.description,images:['/redditrepreneur-logo.png']},
  alternates: {types: {'application/rss+xml': '/rss.xml'}},
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const graph = {'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':`${site.main}/#organisation`,name:'The Redditrepreneur',url:site.main,description:'A Community Intelligence platform and research company helping businesses understand what online communities say about their brand, competitors and market.'},{'@type':'WebSite','@id':`${site.url}/#website`,url:site.url,name:'The Redditrepreneur Blog',publisher:{'@id':`${site.main}/#organisation`},potentialAction:{'@type':'SearchAction',target:`${site.url}/search?q={search_term_string}`,'query-input':'required name=search_term_string'}}]}
  return <html lang="en-GB"><body><Header/><main id="main">{children}</main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(graph).replace(/</g, '\\u003c')}}/></body></html>
}
