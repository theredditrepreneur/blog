import type {Metadata} from 'next'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'
import {site} from '@/lib/site'
import './globals.css'
import './polish.css'
import './publication.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: {default: 'The Redditrepreneur Research', template: `%s | ${site.shortName}`}, description: site.description,
  openGraph: {type: 'website', siteName: site.name, title: 'The Redditrepreneur Research', description: site.description,images:['/redditrepreneur-logo.png']},
  twitter:{card:'summary_large_image',title:'The Redditrepreneur Research',description:site.description,images:['/redditrepreneur-logo.png']},
  alternates: {types: {'application/rss+xml': '/rss.xml'}},
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const graph = {'@context':'https://schema.org','@graph':[{'@type':'NewsMediaOrganization','@id':`${site.url}/#publication`,name:'The Redditrepreneur Research',url:site.url,logo:{'@type':'ImageObject',url:`${site.url}/redditrepreneur-logo.png`},description:site.description,sameAs:['https://www.linkedin.com/company/the-redditrepreneur/','https://x.com/Redditrepreneur']},{'@type':'Person','@id':`${site.url}/authors/tonte-bo-douglas#author`,name:'Tonte Bo Douglas',url:`${site.url}/authors/tonte-bo-douglas`,worksFor:{'@id':`${site.url}/#publication`}},{'@type':'WebSite','@id':`${site.url}/#website`,url:site.url,name:'The Redditrepreneur Research',description:site.description,publisher:{'@id':`${site.url}/#publication`},potentialAction:{'@type':'SearchAction',target:`${site.url}/search?q={search_term_string}`,'query-input':'required name=search_term_string'}}]}
  return <html lang="en-GB"><body><Header/><main id="main">{children}</main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(graph).replace(/</g, '\\u003c')}}/></body></html>
}
