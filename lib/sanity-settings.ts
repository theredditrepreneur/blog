import {client} from '@/sanity/lib/client'

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

export async function getEditorialSettings():Promise<EditorialSettings> {
  try {
    return await client.fetch<EditorialSettings|null>(`*[_id == "siteSettings"][0]{
      "publicationName":title,description,footerStatement,navigation,
      "featuredSlug":featuredContent->slug.current,
      "homepageCollectionSlugs":homepageCollections[]->slug.current,
      newsletterUrl,platformUrl,auditUrl
    }`,{},{next:{revalidate:300}})||{}
  } catch(error) {
    console.error('Sanity site settings query failed',error)
    return {}
  }
}
