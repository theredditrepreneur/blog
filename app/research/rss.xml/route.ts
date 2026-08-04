import {rss,xml} from '@/lib/feed'
import {content} from '@/lib/content'
import {getSanityArticles,mergeContent} from '@/lib/sanity-content'
import {getEditorialSettings} from '@/lib/sanity-settings'
export async function GET(){const settings=await getEditorialSettings();return xml(rss(`${settings.publicationName||'The Redditrepreneur Research'} Feed`,['Research','Index','Article'],mergeContent(content,await getSanityArticles()),settings.description))}
