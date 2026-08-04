import type {Metadata} from 'next'
import Link from 'next/link'
import {ContentCard} from '@/components/cards'
import {Newsletter} from '@/components/newsletter'
import {content} from '@/lib/content'
import {withCoverImages} from '@/lib/covers'
import {getSanityArticles,mergeContent} from '@/lib/sanity-content'
import {getEditorialSettings} from '@/lib/sanity-settings'

export async function generateMetadata():Promise<Metadata>{
  const settings=await getEditorialSettings()
  return {
    title:{absolute:settings.publicationName||'The Redditrepreneur Research'},
    description:settings.description||'Community Intelligence research covering Gaming, AI, Sport, SaaS, Consumer Brands and Entertainment.',
    alternates:{canonical:'/'},
  }
}

export default async function Home() {
  const [sanityArticles,settings]=await Promise.all([getSanityArticles(),getEditorialSettings()])
  const merged=mergeContent(content,sanityArticles)
  const illustrated=await withCoverImages(merged.slice(0,24))
  const latest=illustrated.slice(0,15)
  const weeklySpotlight=merged.find(item=>item.image==='/community-intelligence-weekly-trust.jpg'&&item.title==='Community Intelligence Weekly: Christopher Nolan, AI Advice, Platform Change and Gaming Trust')
  const featured=illustrated.filter(item=>item.featured).slice(0,2)
  const managedFeatured=[settings.featuredSlug,...(settings.homepageCollectionSlugs||[])].filter((slug):slug is string=>Boolean(slug)).map(slug=>illustrated.find(item=>item.slug===slug)).filter((item):item is NonNullable<typeof item>=>Boolean(item))
  const featuredItems=(managedFeatured.length?managedFeatured:(weeklySpotlight?[weeklySpotlight,...featured]:featured)).filter((item,index,items)=>items.findIndex(candidate=>candidate.slug===item.slug)===index).slice(0,2)

  return <>
    <section className="publication-section latest-publication homepage-research-lead shell" aria-labelledby="latest-heading">
      <header className="publication-section-heading"><div><span>New analysis</span><h2 id="latest-heading">Latest Research</h2></div><Link href="/research">View all research</Link></header>
      <div className="card-grid">{latest.map(item=><ContentCard key={item.slug} item={item}/>)}</div>
    </section>

    <section className="publication-section featured-publication" aria-labelledby="featured-heading"><div className="shell">
      <header className="publication-section-heading"><div><span>Editor&apos;s selection</span><h2 id="featured-heading">Featured Research</h2></div></header>
      <div className="featured-publication-grid">{featuredItems.map(item=><ContentCard key={item.slug} item={item} featured/>)}</div>
    </div></section>

    <section className="community-intelligence-explainer" aria-labelledby="community-intelligence-heading"><div className="shell explainer-grid">
      <div><span className="publication-kicker">The discipline</span><h2 id="community-intelligence-heading">What is Community Intelligence?</h2><p>Community Intelligence turns online conversations into practical business insight.</p><Link className="button" href="/frameworks">Explore Frameworks</Link></div>
      <div><p>It helps organisations understand:</p><ul><li>What people believe</li><li>Who they trust</li><li>Why opinions change</li><li>What customers want</li><li>Where risks are emerging</li><li>What action should be taken</li></ul></div>
    </div></section>

    <div className="shell publication-newsletter"><Newsletter/></div>
  </>
}
