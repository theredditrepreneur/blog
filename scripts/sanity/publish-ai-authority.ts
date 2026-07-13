import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client=getCliClient({apiVersion:'2024-01-01'})
const authorId='ghost-author-6a3c71f79974230008809877'
const articleId='article-ai-authority-formula'
const glossaryId='glossary-ai-authority-formula'
const ctaId='cta-ai-authority-audit'
const publishedAt='2026-07-13T10:45:00.000Z'
const updatedAt=publishedAt
const slug='the-ai-authority-formula'
const glossarySlug='ai-authority-formula'
const title='The AI Authority Formula'
const excerpt='AI does not invent trust. It interprets the public evidence surrounding a brand. The AI Authority Formula explains the six signals that shape whether AI systems recommend one company and ignore another.'
const imageAlt='The AI Authority Formula showing Community Trust, Evidence Quality, Recommendation Frequency, Third Party Validation, Content Credibility and Expert Consensus'
const assetPath=path.resolve('public/ai-authority-formula-cover.webp')

const articleHtml=`
<p class="editors-note"><strong>Editor's Note:</strong> This article introduces the AI Authority Formula, a proprietary framework developed by The Redditrepreneur to help organisations understand why AI platforms recommend certain brands and overlook others. While AI search continues to evolve, one principle remains consistent. AI systems rely on evidence, not marketing claims.</p>
<h2>The Biggest Misunderstanding About AI Search</h2>
<p>Many businesses believe that appearing in ChatGPT, Gemini, Claude or Perplexity is primarily an SEO problem.</p>
<p>It is not.</p>
<p>Search engine optimisation helps AI discover your content.</p>
<p>It does not automatically convince AI that your brand deserves to be recommended.</p>
<p>That recommendation depends on something much larger.</p>
<p>Authority.</p>
<p>Not the authority you claim.</p>
<p>The authority that exists across the internet.</p>
<p>When AI systems answer questions such as:</p>
<blockquote><p>"What is the best CRM?"</p><p>"Which project management software should I use?"</p><p>"What is the best accounting platform for small businesses?"</p></blockquote>
<p>They are not creating opinions.</p>
<p>They are interpreting evidence.</p>
<p>That evidence comes from customer conversations, expert opinions, reviews, documentation, publications, community discussions and countless other public signals.</p>
<p>This is where AI Authority begins.</p>
<h2>AI Does Not Invent Trust</h2>
<p>AI models are remarkably good at recognising patterns.</p>
<p>If thousands of customers consistently describe a company as reliable, easy to use and responsive, those signals become part of the evidence AI uses when generating answers.</p>
<p>Likewise, if communities repeatedly discuss poor support, confusing pricing or disappointing product experiences, those signals also become part of the evidence.</p>
<p>AI does not decide whether your brand is trustworthy.</p>
<p>It reflects the trust already established by people.</p>
<p>That distinction is critical.</p>
<h2>Introducing The AI Authority Formula</h2>
<p>At The Redditrepreneur, we define the <a href="/glossary/ai-authority-formula">AI Authority Formula</a> using six core components.</p>
<aside class="formula-callout" aria-labelledby="article-formula-title"><h3 id="article-formula-title">AI Authority Formula</h3><p>AI Authority equals:</p><ul><li>Community Trust</li><li>Evidence Quality</li><li>Recommendation Frequency</li><li>Third Party Validation</li><li>Content Credibility</li><li>Expert Consensus</li></ul></aside>
<p>Together, these factors determine how confidently AI systems can recommend a business.</p>
<p>Let us examine each one.</p>
<h2>1. Community Trust</h2>
<p><a href="/glossary/community-trust">Community Trust</a> measures what real people consistently believe about your business.</p>
<p>This includes conversations across Reddit, forums, communities, social platforms and review websites.</p>
<p><strong>Strong Community Trust looks like:</strong></p>
<ul><li>Authentic customer recommendations.</li><li>Positive implementation stories.</li><li>Helpful discussions between users.</li><li>Honest product experiences.</li></ul>
<p><strong>Weak Community Trust often includes:</strong></p>
<ul><li>Repeated complaints.</li><li>Unanswered frustrations.</li><li>Confusion.</li><li>Declining confidence.</li></ul>
<p>Community Trust is the foundation of AI Authority.</p>
<h2>2. Evidence Quality</h2>
<p>Not all evidence carries the same weight.</p>
<p>AI places greater confidence in evidence that is:</p>
<ul><li>Specific.</li><li>Consistent.</li><li>Detailed.</li><li>Verifiable.</li></ul>
<p>For example:</p>
<blockquote><p>"We reduced reporting time by 70 percent."</p></blockquote>
<p>is significantly stronger than:</p>
<blockquote><p>"This software is amazing."</p></blockquote>
<p>The more useful and consistent the evidence, the more confidence AI can place in it.</p>
<h2>3. Recommendation Frequency</h2>
<p>Authority grows through repetition.</p>
<p>If respected publications, customers, consultants and communities repeatedly recommend the same company, AI recognises that pattern.</p>
<p>One recommendation is interesting.</p>
<p>Thousands of independent recommendations become authority.</p>
<h2>4. Third Party Validation</h2>
<p>Businesses naturally describe themselves positively.</p>
<p>AI understands this.</p>
<p>Independent validation carries greater weight.</p>
<p>Examples include:</p>
<ul><li>Customer reviews.</li><li>Industry reports.</li><li>Analyst commentary.</li><li>Case studies.</li><li>News coverage.</li><li>Independent comparisons.</li></ul>
<p>The more independent evidence available, the stronger the authority.</p>
<h2>5. Content Credibility</h2>
<p>Publishing content is not enough.</p>
<p>AI increasingly evaluates whether that content demonstrates genuine expertise.</p>
<p>Credible content usually includes:</p>
<ul><li>Original research.</li><li>Practical experience.</li><li>Real examples.</li><li>Clear explanations.</li><li>Helpful insights.</li></ul>
<p>Generic content rarely builds lasting authority.</p>
<h2>6. Expert Consensus</h2>
<p>Experts shape industries.</p>
<p>When recognised practitioners consistently recommend similar companies, tools or approaches, AI pays attention.</p>
<p>Expert Consensus can emerge from:</p>
<ul><li>Industry analysts.</li><li>Consultants.</li><li>Researchers.</li><li>Experienced practitioners.</li><li>Professional communities.</li></ul>
<p>Consensus strengthens confidence.</p>
<h2>AI Authority Is Built Before AI Finds You</h2>
<p>Many organisations focus entirely on becoming visible inside AI platforms.</p>
<p>Visibility is only one part of the equation.</p>
<p>Imagine two companies appear equally often across AI search.</p>
<p>One has:</p>
<ul><li>Strong customer advocacy.</li><li>Consistent community recommendations.</li><li>Detailed case studies.</li><li>Independent validation.</li></ul>
<p>The other has:</p>
<ul><li>Limited public discussion.</li><li>Few customer stories.</li><li>Weak supporting evidence.</li></ul>
<p>Which company is AI more likely to recommend confidently?</p>
<p>The answer is obvious.</p>
<p>Authority always outperforms visibility.</p>
<h2>Why Community Intelligence Matters</h2>
<p><a href="/what-is-community-intelligence">Community Intelligence</a> helps organisations understand the evidence AI is already learning from.</p>
<p>Without Community Intelligence, leadership teams often rely only on:</p>
<ul><li>Analytics.</li><li>Surveys.</li><li>Internal assumptions.</li></ul>
<p>Those sources reveal what happens inside the business.</p>
<p>Community Intelligence reveals what happens outside it.</p>
<p>That external evidence increasingly shapes AI recommendations.</p>
<h2>The Future Belongs To Authoritative Brands</h2>
<p>The companies that succeed in <a href="/topics/ai-search">AI search</a> will not necessarily publish the most content.</p>
<p>They will become the most trusted.</p>
<p>Trust is created through products, customers, communities, evidence and consistent experience.</p>
<p>AI simply reflects those realities.</p>
<p>Understanding those signals will become one of the defining competitive advantages of the next decade.</p>
<h2>Final Thought</h2>
<p>AI Authority cannot be purchased.</p>
<p>It cannot be manufactured overnight.</p>
<p>It is earned through consistent evidence across communities, customers and independent sources.</p>
<p>Businesses that understand this will build stronger reputations, stronger recommendations and stronger long term growth.</p>
<p>The question is no longer:</p>
<blockquote><p>"How do we rank?"</p></blockquote>
<p>The better question is:</p>
<blockquote><p>"Why should AI trust us?"</p></blockquote>
<p>That is the question the AI Authority Formula is designed to answer.</p>
<h2>About The Redditrepreneur</h2>
<p>The Redditrepreneur is a Community Intelligence platform and research company helping businesses understand what online communities say about their brand, competitors and market.</p>`

const glossaryHtml=`
<p><a href="/the-ai-authority-formula">Read the full article: The AI Authority Formula</a></p>
<h2>Definition</h2><p>The AI Authority Formula is a proprietary framework developed by The Redditrepreneur to explain how AI systems build confidence when recommending brands, products and organisations.</p><p>Rather than relying on a single ranking factor, the framework recognises that AI recommendations emerge from multiple forms of public evidence collected across the internet.</p>
<h2>The Formula</h2><p>AI Authority equals Community Trust, Evidence Quality, Recommendation Frequency, Third Party Validation, Content Credibility and Expert Consensus.</p>
<h2>Why It Matters</h2><p>AI platforms such as ChatGPT, Gemini, Claude and Perplexity increasingly generate recommendations using evidence gathered from websites, customer conversations, expert opinions, community discussions and independent sources.</p><p>The AI Authority Formula helps organisations understand the factors that strengthen or weaken those recommendations.</p>
<h2>Practical Applications</h2><ul><li>Assess AI recommendation readiness.</li><li>Identify authority gaps.</li><li>Improve Community Intelligence.</li><li>Strengthen AI search visibility.</li><li>Inform content strategy.</li><li>Support executive decision making.</li><li>Compare competitive authority.</li></ul>`

const existingAsset=await client.fetch<{_id:string}|null>('*[_id==$articleId][0]{"_id":coverImage.asset._ref}',{articleId})
const imageAsset=existingAsset||await client.assets.upload('image',fs.createReadStream(assetPath),{filename:'ai-authority-formula-cover.webp',contentType:'image/webp',title})
let aiSearchTopic=await client.fetch<{_id:string}|null>('*[_type=="topic" && (title=="AI Search" || slug.current=="ai-search")][0]{_id}')
if(!aiSearchTopic){await client.createIfNotExists({_id:'topic-ai-search',_type:'topic',title:'AI Search',slug:{_type:'slug',current:'ai-search'},introduction:'Research and analysis examining how AI systems discover, interpret and recommend brands, products and information.',seo:{_type:'seo',title:'AI Search Research',description:'Explore Community Intelligence research about AI search, recommendations, authority and visibility.'}});aiSearchTopic={_id:'topic-ai-search'}}
const related=await client.fetch<Array<{_id:string,slug:string}>>('*[_type in ["article","researchReport","framework","newsBrief"] && slug.current in $slugs]{_id,"slug":slug.current}',{slugs:['the-community-intelligence-convergence-of-meta-reddit-and-google','the-community-intelligence-stack-turning-conversations-into-competitive-advantage','google-just-brought-communities-into-ai-search-heres-why-it-matters']})
const relatedTerms=await client.fetch<Array<{_id:string,slug:string}>>('*[_type=="glossaryEntry" && slug.current in $slugs]{_id,"slug":slug.current}',{slugs:['ai-search','community-intelligence','community-trust','community-intelligence-audit']})

await client.createOrReplace({_id:ctaId,_type:'callToAction',title:'Discover What AI Believes About Your Brand',label:'Explore the AI Authority Audit',url:'https://www.theredditrepreneur.com/services/ai-authority-audit',style:'primary'})
await client.createOrReplace({_id:articleId,_type:'article',title,slug:{_type:'slug',current:slug},excerpt,coverImage:{_type:'image',asset:{_type:'reference',_ref:imageAsset._id},alt:imageAlt},author:{_type:'reference',_ref:authorId},publishedAt,updatedAt,topics:aiSearchTopic?[{_type:'reference',_key:'ai-search',_ref:aiSearchTopic._id}]:[],frameworks:[],relatedContent:related.map(item=>({_type:'reference',_key:item.slug,_ref:item._id})),primaryCta:{_type:'reference',_ref:ctaId},featured:false,seo:{_type:'seo',title:'The AI Authority Formula: Why AI Recommends Some Brands',description:'Discover the six signals that shape AI recommendations, including Community Trust, Evidence Quality, Third Party Validation and Expert Consensus.',canonicalUrl:'https://blog.theredditrepreneur.com/the-ai-authority-formula'},body:[{_type:'legacyHtml',_key:'article-body',html:articleHtml,reviewStatus:'reviewed',notes:'Final supplied article formatted for the publishing platform.'}]})
await client.createOrReplace({_id:glossaryId,_type:'glossaryEntry',title:'AI Authority Formula',term:'AI Authority Formula',slug:{_type:'slug',current:glossarySlug},excerpt:"The AI Authority Formula is The Redditrepreneur's framework for understanding the public evidence that influences whether AI systems recommend a brand.",conciseDefinition:"The AI Authority Formula is The Redditrepreneur's framework for understanding the public evidence that influences whether AI systems recommend a brand.",fullDefinition:[{_type:'block',_key:'definition',style:'normal',markDefs:[],children:[{_type:'span',_key:'definition-text',marks:[],text:'The AI Authority Formula is a proprietary framework developed by The Redditrepreneur to explain how AI systems build confidence when recommending brands, products and organisations. Rather than relying on a single ranking factor, the framework recognises that AI recommendations emerge from multiple forms of public evidence collected across the internet.'}]}],whyItMatters:[{_type:'block',_key:'why',style:'normal',markDefs:[],children:[{_type:'span',_key:'why-text',marks:[],text:'The AI Authority Formula helps organisations understand the factors that strengthen or weaken AI recommendations.'}]}],example:[{_type:'block',_key:'application',style:'normal',markDefs:[],children:[{_type:'span',_key:'application-text',marks:[],text:'The framework can be used to assess AI recommendation readiness, identify authority gaps and compare competitive authority.'}]}],author:{_type:'reference',_ref:authorId},publishedAt,updatedAt,topics:aiSearchTopic?[{_type:'reference',_key:'ai-search',_ref:aiSearchTopic._id}]:[],frameworks:[],relatedContent:[{_type:'reference',_key:'article',_ref:articleId}],relatedTerms:relatedTerms.map(item=>({_type:'reference',_key:item.slug,_ref:item._id})),featured:false,seo:{_type:'seo',title:'AI Authority Formula Definition | The Redditrepreneur',description:'Learn what the AI Authority Formula means and how community trust, evidence, validation, content and expert consensus shape AI recommendations.',canonicalUrl:'https://blog.theredditrepreneur.com/glossary/ai-authority-formula'},body:[{_type:'legacyHtml',_key:'glossary-body',html:glossaryHtml,reviewStatus:'reviewed',notes:'Final supplied glossary entry formatted for the publishing platform.'}]})

const result=await client.fetch('{"article":*[_id==$articleId][0]{_id,title,"slug":slug.current,"image":coverImage.asset->url,"related":count(relatedContent),"topic":topics[0]->title},"glossary":*[_id==$glossaryId][0]{_id,term,"slug":slug.current,"relatedTerms":count(relatedTerms)}}',{articleId,glossaryId})
console.log(JSON.stringify(result,null,2))
