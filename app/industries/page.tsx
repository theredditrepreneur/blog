import type {Metadata} from 'next'
import {IndustryCard} from '@/components/publication'
import {industries} from '@/lib/industries'

export const metadata:Metadata={title:'Industries',description:'Community Intelligence research across Gaming, AI, Sport, SaaS, Consumer Brands and Entertainment.',alternates:{canonical:'/industries'}}

export default function IndustriesPage(){return <>
  <header className="industry-index-hero shell"><span className="publication-kicker">Editorial desks</span><h1>Community Intelligence by industry</h1><p>Focused research into the communities shaping six of the world&apos;s most important industries.</p></header>
  <section className="publication-section shell"><div className="industry-grid industry-index-grid">{industries.map(industry=><IndustryCard key={industry.slug} industry={industry}/>)}</div></section>
</>}
