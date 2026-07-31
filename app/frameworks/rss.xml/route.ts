import {rss,xml} from '@/lib/feed'
import {content} from '@/lib/content'
import {getSanityArticles,mergeContent} from '@/lib/sanity-content'
export async function GET(){return xml(rss('Community Intelligence Frameworks',['Framework'],mergeContent(content,await getSanityArticles())))}
