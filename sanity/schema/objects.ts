import {defineType,defineField,defineArrayMember} from 'sanity'
export const objects=[
defineType({name:'seo',title:'SEO',type:'object',fields:[defineField({name:'title',type:'string',validation:r=>r.max(60)}),defineField({name:'description',type:'text',rows:3,validation:r=>r.max(160)}),defineField({name:'canonicalUrl',type:'url'}),defineField({name:'ogImage',type:'image'})]}),
defineType({name:'legacyMetadata',title:'Migration metadata',type:'object',options:{collapsible:true,collapsed:true},fields:[defineField({name:'ghostId',type:'string'}),defineField({name:'ghostUuid',type:'string'}),defineField({name:'originalSlug',type:'string'}),defineField({name:'originalUrl',type:'url'}),defineField({name:'legacyTags',type:'array',of:[defineArrayMember({type:'string'})]}),defineField({name:'manualReview',type:'boolean'}),defineField({name:'migrationNotes',type:'array',of:[defineArrayMember({type:'string'})]})]}),
defineType({name:'tableBlock',title:'Table',type:'object',fields:[defineField({name:'caption',type:'string'}),defineField({name:'rows',type:'array',of:[defineArrayMember({type:'object',fields:[defineField({name:'cells',type:'array',of:[defineArrayMember({type:'string'})]})]})]})]}),
defineType({name:'videoEmbed',title:'Video',type:'object',fields:[defineField({name:'url',type:'url',validation:r=>r.required()}),defineField({name:'title',type:'string',validation:r=>r.required()}),defineField({name:'caption',type:'string'}),defineField({name:'transcript',type:'text'})]}),
defineType({name:'legacyHtml',title:'Legacy HTML fallback',type:'object',fields:[defineField({name:'html',type:'text',rows:12,readOnly:true}),defineField({name:'reviewStatus',type:'string',options:{list:['required','reviewed','replaced']},initialValue:'required'}),defineField({name:'notes',type:'text'})]}),
defineType({name:'scorecardCriteria',title:'Nine Scorecard criteria',type:'object',fields:[
  defineField({name:'brandTrust',title:'Brand Trust',type:'number',validation:r=>r.required().min(0).max(10)}),
  defineField({name:'productSatisfaction',title:'Product Satisfaction',type:'number',validation:r=>r.required().min(0).max(10)}),
  defineField({name:'innovationPerception',title:'Innovation Perception',type:'number',validation:r=>r.required().min(0).max(10)}),
  defineField({name:'communityEngagement',title:'Community Engagement',type:'number',validation:r=>r.required().min(0).max(10)}),
  defineField({name:'advocacy',title:'Advocacy',type:'number',validation:r=>r.required().min(0).max(10)}),
  defineField({name:'narrativeConsistency',title:'Narrative Consistency',type:'number',validation:r=>r.required().min(0).max(10)}),
  defineField({name:'competitivePosition',title:'Competitive Position',type:'number',validation:r=>r.required().min(0).max(10)}),
  defineField({name:'customerSupport',title:'Customer Support',type:'number',validation:r=>r.required().min(0).max(10)}),
  defineField({name:'aiSearchReadiness',title:'AI Search Readiness',type:'number',validation:r=>r.required().min(0).max(10)}),
]}),
]
export const cta=defineType({name:'callToAction',title:'Call to action',type:'document',fields:[defineField({name:'title',type:'string',validation:r=>r.required()}),defineField({name:'label',type:'string',validation:r=>r.required()}),defineField({name:'url',type:'url',validation:r=>r.required()}),defineField({name:'style',type:'string',options:{list:['primary','secondary','text']},initialValue:'primary'})]})
