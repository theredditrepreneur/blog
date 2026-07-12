import {rss,xml} from '@/lib/feed'
export function GET(){return xml(rss('The Redditrepreneur Research Feed',['Research','Index','Article']))}
