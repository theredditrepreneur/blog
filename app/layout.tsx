import type {Metadata} from 'next'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'
import {site} from '@/lib/site'
import {getEditorialSettings} from '@/lib/sanity-settings'
import './globals.css'
import './polish.css'
import './publication.css'

export async function generateMetadata():Promise<Metadata>{
  const settings=await getEditorialSettings()
  const title=settings.publicationName||'The Redditrepreneur Research'
  const description=settings.description||site.description
  return {
  metadataBase: new URL(site.url), title: {default:title, template: `%s | ${site.shortName}`}, description,
  openGraph: {type: 'website', siteName: title, title, description,images:['/redditrepreneur-logo.png']},
  twitter:{card:'summary_large_image',title,description,images:['/redditrepreneur-logo.png']},
  alternates: {types: {'application/rss+xml': '/rss.xml'}},
  }
}

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const settings=await getEditorialSettings()
  const publicationName=settings.publicationName||'The Redditrepreneur Research'
  const description=settings.description||site.description
  const graph = {'@context':'https://schema.org','@graph':[{'@type':'NewsMediaOrganization','@id':`${site.url}/#publication`,name:publicationName,url:site.url,logo:{'@type':'ImageObject',url:`${site.url}/redditrepreneur-logo.png`},description,sameAs:['https://www.linkedin.com/company/the-redditrepreneur/','https://x.com/Redditrepreneur']},{'@type':'Person','@id':`${site.url}/authors/tonte-bo-douglas#author`,name:'Tonte Bo Douglas',url:`${site.url}/authors/tonte-bo-douglas`,worksFor:{'@id':`${site.url}/#publication`}},{'@type':'WebSite','@id':`${site.url}/#website`,url:site.url,name:publicationName,description,publisher:{'@id':`${site.url}/#publication`},potentialAction:{'@type':'SearchAction',target:`${site.url}/search?q={search_term_string}`,'query-input':'required name=search_term_string'}}]}
  return <html lang="en-GB"><body><Header navigation={settings.navigation}/><main id="main">{children}</main><Footer statement={settings.footerStatement}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(graph).replace(/</g, '\\u003c')}}/></body></html>
}
