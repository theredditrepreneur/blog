import {rss,xml} from '@/lib/feed'
export function GET(){return xml(rss('Community Intelligence Scorecards',['Scorecard']))}
