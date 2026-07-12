import Image from 'next/image'
import Link from 'next/link'
import {nav, site} from '@/lib/site'

export function Header() {
  return <header className="site-header">
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="header-inner">
      <Link className="brand" href="/" aria-label="The Redditrepreneur Research home">
        <Image src="/redditrepreneur-logo.png" width={232} height={95} alt="The Redditrepreneur" priority />
      </Link>
      <nav aria-label="Primary navigation">
        {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <Link href="/search" aria-label="Search">Search</Link>
        <a href={site.main}>Main website</a>
        <a className="button small" href={site.newsletter}>Subscribe</a>
      </div>
      <details className="mobile-menu">
        <summary aria-label="Open navigation">Menu</summary>
        <nav aria-label="Mobile navigation">
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link href="/search">Search</Link><a href={site.main}>Main website</a><a href={site.newsletter}>Subscribe</a>
        </nav>
      </details>
    </div>
  </header>
}
