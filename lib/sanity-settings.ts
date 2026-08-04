import {client} from '@/sanity/lib/client'
import {defineQuery} from 'next-sanity'

export type EditorialSettings={
  publicationName?:string
  description?:string
  footerStatement?:string
  navigation?:Array<{label:string;href:string}>
  featuredSlug?:string
  homepageCollectionSlugs?:string[]
  newsletterUrl?:string
  platformUrl?:string
  auditUrl?:string
}

const editorialSettingsQuery=defineQuery(`*[_id == "siteSettings"][0]{
  "publicationName":title,description,footerStatement,navigation,
  "featuredSlug":featuredContent->slug.current,
  "homepageCollectionSlugs":homepageCollections[]->slug.current,
  newsletterUrl,platformUrl,auditUrl
}`)

export async function getEditorialSettings():Promise<EditorialSettings> {
  try {
    return await client.withConfig({useCdn:false}).fetch<EditorialSettings|null>(
      editorialSettingsQuery,
      {},
      {next:{revalidate:30,tags:['site-settings']}},
    )||{}
  } catch(error) {
    console.error('Sanity site settings query failed',error)
    return {}
  }
}
