import type {StructureResolver} from 'sanity/structure'

const managedTypes=['siteSettings','article','researchReport','scorecard','caseStudy','framework','benchmark','weekly','indexIssue','newsBrief','author','topic','callToAction']

export const structure:StructureResolver=(S)=>S.list().title('The Redditrepreneur').items([
  S.listItem().title('Site settings').child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site settings')),
  S.divider(),
  S.documentTypeListItem('article').title('Articles'),
  S.documentTypeListItem('weekly').title('Community Intelligence Weekly'),
  S.documentTypeListItem('researchReport').title('Research reports'),
  S.documentTypeListItem('scorecard').title('Scorecards'),
  S.documentTypeListItem('caseStudy').title('Case studies'),
  S.documentTypeListItem('framework').title('Frameworks'),
  S.documentTypeListItem('benchmark').title('Benchmarks'),
  S.documentTypeListItem('indexIssue').title('Community Intelligence Index'),
  S.documentTypeListItem('newsBrief').title('News briefs'),
  S.divider(),
  S.documentTypeListItem('author').title('Authors'),
  S.documentTypeListItem('topic').title('Topics and tags'),
  S.documentTypeListItem('callToAction').title('Calls to action'),
  S.divider(),
  ...S.documentTypeListItems().filter(item=>!managedTypes.includes(item.getId()||'')),
])
