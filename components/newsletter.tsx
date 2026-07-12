import {site} from '@/lib/site'

export function Newsletter() {
  return <section className="newsletter"><div><div className="eyebrow">Community Intelligence Weekly</div><h2>Stay Ahead of the Conversations Shaping Brands, Markets and Culture</h2><p>Join readers tracking the signals influencing trust, discovery and market behaviour.</p></div><form action={site.newsletter} method="get"><label htmlFor="newsletter-email">Email address</label><input id="newsletter-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com"/><button type="submit">Subscribe</button><small>Subscription is managed by Substack. See our privacy information before subscribing.</small></form></section>
}
