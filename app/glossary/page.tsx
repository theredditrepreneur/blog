import {GlossaryIndex} from '@/components/glossary-index'
import {glossaryTerms} from '@/lib/glossary'
export const metadata={title:'Community Intelligence Glossary',description:'Definitions for Community Intelligence, community research, brand intelligence and original Redditrepreneur frameworks.',alternates:{canonical:'/glossary'}}
export default function Page(){return <><header className="page-hero shell"><div className="eyebrow">Canonical definitions</div><h1>Community Intelligence Glossary</h1><p>Clear, connected definitions for the language of Community Intelligence, with related frameworks and further reading.</p></header><GlossaryIndex terms={glossaryTerms}/></>}
