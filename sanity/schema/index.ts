import {type SchemaTypeDefinition} from 'sanity'
import {objects,cta} from './objects'
import {blockContent} from './shared'
import {article,researchReport,scorecard,caseStudy,framework,benchmark,weekly,indexIssue,glossaryEntry,newsBrief,author,topic,page,siteSettings,redirect} from './documents'
export const schemaTypes:SchemaTypeDefinition[]=[...objects,blockContent,cta,article,researchReport,scorecard,caseStudy,framework,benchmark,weekly,indexIssue,glossaryEntry,newsBrief,author,topic,page,siteSettings,redirect]
