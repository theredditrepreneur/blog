import type {Metadata} from 'next'
import Link from 'next/link'
import {FrameworkCard} from '@/components/publication'
import {content,frameworks} from '@/lib/content'

export const metadata:Metadata={title:'Community Intelligence Frameworks',description:'Explore the models The Redditrepreneur uses to explain how community trust, belief, behaviour and authority move.',alternates:{canonical:'/frameworks'}}

const descriptions:Record<string,string>={
  'Community Intelligence Stack':'The system that turns conversations into evidence, insight, decisions and action.',
  'Community Intelligence Scorecard':'A nine-criterion method for measuring perception, participation and strategic value.',
  'Customer Insight Triangle':'A model connecting what customers say, what they do and what they believe.',
  'Community Gravity':'The force that makes people stay because relationships, history and routines already exist.',
  'Belief Correction':'The moment new evidence forces a community to reconsider what it believed.',
  'Narrative Compression':'The way a complicated event is reduced to one simple story that spreads.',
  'Trust Collapse':'The process through which repeated doubt becomes a wider loss of confidence.',
  'Mission Premium':'The higher standard people apply to a company because of what it claims to stand for.',
  'Market Gravity':'The pull created when attention, evidence and participation gather around one market leader.',
  'Hype Hangover':'The disappointment left when intense anticipation meets a weaker lived experience.',
  'Expectation Gravity':'The pressure created when past success raises expectations for everything that follows.',
  'Share of Consensus':'How strongly a brand or idea appears within trusted community recommendations.',
}

export default function FrameworksPage(){
  const frameworkContent=content.filter(item=>item.type==='Framework')
  const hrefFor=(name:string)=>frameworkContent.find(item=>item.title.toLowerCase().includes(name.toLowerCase().replace('community intelligence ','')))?.slug
  return <>
    <header className="industry-index-hero shell"><span className="publication-kicker">Original thinking</span><h1>Frameworks for understanding communities</h1><p>Clear models for explaining how trust, belief, behaviour and authority move through online communities.</p></header>
    <section className="publication-section shell"><div className="publication-framework-grid framework-library">{frameworks.map(name=>{const slug=hrefFor(name);return <FrameworkCard key={name} name={name} description={descriptions[name]} href={slug?`/${slug}`:'/glossary'}/>})}</div></section>
    <section className="framework-method-band"><div className="shell"><span className="publication-kicker">Use the library</span><h2>Move from observation to explanation</h2><p>Articles show what is happening. Frameworks help explain why it is happening and what may happen next.</p><div className="actions"><Link className="button" href="/research">Read the latest research</Link><Link className="publication-secondary" href="/glossary">Browse the glossary</Link></div></div></section>
  </>
}
