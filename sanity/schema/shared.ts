import {defineArrayMember,defineField,defineType} from 'sanity'

export const blockContent=defineType({name:'blockContent',title:'Article body',type:'array',of:[
  defineArrayMember({type:'block',marks:{annotations:[defineArrayMember({name:'link',title:'Link',type:'object',fields:[defineField({name:'href',title:'URL or path',type:'string',validation:r=>r.required()}),defineField({name:'blank',title:'Open in a new tab',type:'boolean',initialValue:false})]})]}}),
  defineArrayMember({type:'image',options:{hotspot:true},fields:[defineField({name:'alt',type:'string',validation:r=>r.required()}),defineField({name:'caption',type:'string'})]}),
  defineArrayMember({type:'tableBlock'}),defineArrayMember({type:'videoEmbed'}),defineArrayMember({type:'reference',to:[{type:'callToAction'}]}),defineArrayMember({type:'legacyHtml'}),
]})

export const bodyField=defineField({name:'body',title:'Body',type:'blockContent'})

export const commonFields=[
  defineField({name:'title',type:'string',validation:r=>r.required()}),
  defineField({name:'slug',type:'slug',options:{source:'title',maxLength:96},validation:r=>r.required()}),
  defineField({name:'excerpt',type:'text',rows:3,validation:r=>r.max(320)}),
  defineField({name:'coverImage',type:'image',options:{hotspot:true},fields:[defineField({name:'alt',type:'string',validation:r=>r.required()}),defineField({name:'caption',type:'string'})]}),
  defineField({name:'author',type:'reference',to:[{type:'author'}],validation:r=>r.required()}),
  defineField({name:'publishedAt',type:'datetime',validation:r=>r.required()}),defineField({name:'updatedAt',type:'datetime'}),
  defineField({name:'topics',type:'array',of:[defineArrayMember({type:'reference',to:[{type:'topic'}]})]}),
  defineField({name:'industry',title:'Primary editorial desk',type:'string',description:'The primary industry desk for this publication.',options:{list:[{title:'Gaming',value:'gaming'},{title:'AI',value:'ai'},{title:'Sport',value:'sport'},{title:'SaaS',value:'saas'},{title:'Consumer Brands',value:'consumer-brands'},{title:'Entertainment',value:'entertainment'}]}}),
  defineField({name:'frameworks',type:'array',of:[defineArrayMember({type:'reference',to:[{type:'framework'}]})]}),
  defineField({name:'relatedContent',type:'array',description:'Manual selections override automatic related content.',of:[defineArrayMember({type:'reference',to:[{type:'article'},{type:'researchReport'},{type:'scorecard'},{type:'caseStudy'},{type:'framework'},{type:'benchmark'},{type:'weekly'},{type:'indexIssue'},{type:'glossaryEntry'}]})]}),
  defineField({name:'primaryCta',type:'reference',to:[{type:'callToAction'}]}),defineField({name:'featured',type:'boolean',initialValue:false}),
  defineField({name:'seo',type:'seo'}),defineField({name:'legacy',type:'legacyMetadata'}),bodyField,
]
