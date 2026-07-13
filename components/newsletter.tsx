import {site} from '@/lib/site'
import Link from 'next/link'
import {latestWeeklySlug} from '@/lib/content'

export function Newsletter() {
  return <section className="newsletter"><div><div className="eyebrow">Community Intelligence Weekly</div><h2>Stay Ahead of the Conversations Shaping Brands, Markets and Culture</h2><p>Join readers tracking the signals influencing trust, discovery and market behaviour.</p><div className="newsletter-links"><Link href={`/${latestWeeklySlug}`}>Read the latest issue</Link><Link href="/community-intelligence-weekly">Browse the archive</Link></div></div><form action={site.newsletter} method="get"><label htmlFor="newsletter-name">First name <span>(optional)</span></label><input id="newsletter-name" name="first_name" type="text" autoComplete="given-name"/><label htmlFor="newsletter-email">Email address</label><input id="newsletter-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com"/><button type="submit">Subscribe</button><small>Subscription is managed by Substack. You can unsubscribe at any time. By continuing, you agree to our <Link href="/privacy">privacy information</Link>.</small></form></section>
}
