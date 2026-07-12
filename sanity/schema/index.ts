import {type SchemaTypeDefinition} from 'sanity'
import {objects,cta} from './objects'
import {article,researchReport,scorecard,caseStudy,framework,benchmark,weekly,indexIssue,glossaryEntry,newsBrief,author,topic,page} from './documents'
export const schemaTypes:SchemaTypeDefinition[]=[...objects,cta,article,researchReport,scorecard,caseStudy,framework,benchmark,weekly,indexIssue,glossaryEntry,newsBrief,author,topic,page]
