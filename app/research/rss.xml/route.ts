import {rss,xml} from '@/lib/feed'
import {content} from '@/lib/content'
import {getSanityArticles,mergeContent} from '@/lib/sanity-content'
export async function GET(){return xml(rss('The Redditrepreneur Research Feed',['Research','Index','Article'],mergeContent(content,await getSanityArticles())))}
